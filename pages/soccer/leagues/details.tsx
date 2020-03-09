import "./styles.scss";
import "../styles.scss";
import React, { useState } from "react";
import Layout from "../../../components/layout";
import { LocalizedPage } from "../../../common/helpers/Localizer";
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

type Props = {
  league?: LeagueTable;
  countryCode: string | string[];
  leagueGroupName: string | string[];
  fixtures: MatchSummary[];
  results: MatchSummary[];
};

const SoccerLeagueDetailPage: LocalizedPage<Props> = props => {
  const { t, league, fixtures, results } = props;
  const [selectedTabIndex, setTab] = useState(0);
  const [isShowAllResults, setShowAllResults] = useState(false);
  const isShowTableTab = league?.GroupTables?.length ? league?.GroupTables?.length > 0 : false;

  resetIdCounter();

  const handleShowAllResults = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    event.preventDefault();
    setShowAllResults(!isShowAllResults);
  };

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
        <LeagueInfo leagueName={props.leagueGroupName.toString()} countryCode={props.countryCode?.toString()} />
        <span className="icon-menu-favorites"></span>
      </div>
      <>
        <Tabs selectedIndex={selectedTabIndex} onSelect={setTab}>
          <div>
            <TabList>
              {isShowTableTab && (
                <Tab>{t(SoccerResourceKey.TABLE, {ns: ResourceType.SOCCER})}</Tab>
              )}
              <Tab>{t(SoccerResourceKey.FIXTURE, {ns: ResourceType.SOCCER})}</Tab>
            </TabList>
          </div>
          {league?.GroupTables && isShowTableTab && (
            <TabPanel>
              <LeagueTableComponent leagueTable={league} homeTeamId="" awayTeamId="" />
            </TabPanel>
          )}
          <TabPanel>
            Fixture
            {/* <Button className="btn btn-show-results" onClick={handleShowAllResults}>
              {t(isShowAllResults ? SoccerResourceKey.HIDE_ALL_RESULTS : SoccerResourceKey.SHOW_ALL_RESULTS, {ns: ResourceType.SOCCER})}
            </Button>
            <FixtureTable fixtures={fixtures} results={results} isShowAllResults={isShowAllResults}/>*/}
          </TabPanel>
        </Tabs>
      </>
    </Layout>
  );
};

SoccerLeagueDetailPage.getInitialProps = async ({ query }) => {
  const { id, seasonId, groupName, leagueGroupName, countryCode } = query;
  const league = await SoccerAPI.GetLeagueTable(id.toString(), seasonId.toString(), groupName?.toString());
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

  return {
    namespacesRequired: [ResourceType.SOCCER],
    league,
    leagueGroupName: leagueGroupName,
    countryCode,
    fixtures: fixtures,
    results: results
  };
};

export default withLoadingPage(SoccerLeagueDetailPage);
