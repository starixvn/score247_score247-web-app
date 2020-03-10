import "./styles.scss";
import "../styles.scss";
import React from "react";
import Layout from "../../../components/layout";
import withLoadingPage from "../../../hoc/with-loading-page";
import { CommonResourceKey, ResourceType, SoccerResourceKey } from "../../../common/resources";
import { SoccerAPI } from '../../../apis/soccer/soccer-api';
import { Tabs, TabList, Tab, TabPanel, resetIdCounter } from 'react-tabs';
import LeagueTableComponent from '../../../components/soccer/match-detail/league-table';
import { LeagueTable, MatchSummary } from '../../../apis/soccer/models';
import LeagueInfo from '../../../components/soccer/league-info';
import { MatchStatusHelper } from "../../../common/enums/match-status-type";
import { SoccerBanner } from '../../../components/soccer/banner';
import FixtureTable from "../../../components/soccer/table/fixture-table";
import Button from "../../../components/common/basic/button";
import { WithTranslation } from 'react-i18next';
import { NextPageContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

type Props = {
  query: ParsedUrlQuery;
} & WithTranslation;

type State = {
  league?: LeagueTable;
  fixtures: MatchSummary[];
  results: MatchSummary[];
  tabIndex: number;
  isShowAllResults: boolean;
};

class SoccerLeagueDetailPage extends React.Component<Props, State> {
  static async getInitialProps(ctx: NextPageContext) {
    const query = ctx.query;
    return { query: query };
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      league: undefined,
      results: [],
      fixtures: [],
      tabIndex: 0,
      isShowAllResults: false
    };
  }

  async componentWillMount() {
    const { query } = this.props;
    const { id, seasonId, roundGroup, leagueGroupName } = query;
    resetIdCounter();

    const league = await SoccerAPI.GetLeagueTable(id.toString(), seasonId.toString(), roundGroup ? roundGroup.toString() : encodeURI("white space"));
    const allMatches = await SoccerAPI.GetFixtures(id.toString(), seasonId.toString(), leagueGroupName?.toString());
    const isFixture = (match: MatchSummary) =>
      MatchStatusHelper.isLiveMatch(match.MatchStatus) ||
      MatchStatusHelper.isNotStarted(match.MatchStatus) ||
      new Date(match.EventDate[0]).getTime() > Date.now();

    const compareTwoSoccerMatchByEventTime = (a: MatchSummary, b: MatchSummary) =>
      new Date(a.EventDate[0]).getTime() - new Date(b.EventDate[0]).getTime();

    const orderedMatches = [...allMatches].sort(compareTwoSoccerMatchByEventTime);
    const fixtures = orderedMatches.filter(isFixture);
    const results = orderedMatches.filter((match) => !isFixture(match));

    this.setState({
      league,
      fixtures,
      results
    });
  }

  handleShowAllResults = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    event.preventDefault();
    this.setState({
      isShowAllResults: !this.state.isShowAllResults
    });
  }

  render() {
    const isShowTableTab = this.state.league?.GroupTables?.length ? this.state.league?.GroupTables?.length > 0 : false;
    const { t, query } = this.props;
    const displayFixtures = false;

    return (
      <Layout
        title={t(CommonResourceKey.SOCCER)}
        breadcrumbs={[
          t(CommonResourceKey.SOCCER),
          t(SoccerResourceKey.LEAGUE_DETAIL, { ns: ResourceType.SOCCER })
        ]}
      >
        <SoccerBanner />
        <div className="league-info">
          <LeagueInfo leagueName={query.leagueGroupName.toString()} countryCode={query.countryCode?.toString()} />
          <span className="icon-menu-favorites"></span>
        </div>
        <>
          {this.state.league !== undefined && <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
            <div>
              <TabList>
                {isShowTableTab && (
                  <Tab>{t(SoccerResourceKey.TABLE, { ns: ResourceType.SOCCER })}</Tab>
                )}
                <Tab>{t(SoccerResourceKey.FIXTURE, { ns: ResourceType.SOCCER })}</Tab>
              </TabList>
            </div>
            {this.state.league?.GroupTables && isShowTableTab && (
              <TabPanel>
                <LeagueTableComponent leagueTable={this.state.league} homeTeamId="" awayTeamId="" />
              </TabPanel>
            )}
            <TabPanel>
              FIXTURES
              {displayFixtures && <Button className="btn btn-show-results" onClick={this.handleShowAllResults}>
                {t(this.state.isShowAllResults ? SoccerResourceKey.HIDE_ALL_RESULTS : SoccerResourceKey.SHOW_ALL_RESULTS, { ns: ResourceType.SOCCER })}
              </Button>}
              {displayFixtures && <FixtureTable fixtures={this.state.fixtures} results={this.state.results} isShowAllResults={this.state.isShowAllResults} />}
            </TabPanel>
          </Tabs>}
        </>
      </Layout>
    );
  }
}

export default withLoadingPage(SoccerLeagueDetailPage);
