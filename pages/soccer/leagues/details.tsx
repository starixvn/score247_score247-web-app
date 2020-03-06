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
import { LeagueTable } from '../../../apis/soccer/models';
import LeagueInfo from '../../../components/soccer/league-info';
import { SoccerMatch } from "../../../apis/soccer/models/soccer-match";
import { MatchStatusHelper } from "../../../common/enums/match-status-type";
import { SoccerBanner } from '../../../components/soccer/banner';

type Props = {
  leagueId: string | string[];
  seasonId: string | string[];
  groupName: string | string[];
  league?: LeagueTable;
  countryCode: string | string[];
  leagueGroupName: string | string[];
  fixtures: SoccerMatch[];
  results: SoccerMatch[];
};

const SoccerLeagueDetailPage: LocalizedPage<Props> = props => {
  const { t, league } = props;
  const [selectedTabIndex, setTab] = useState(0);
  const isShowTableTab = league?.GroupTables?.length ? league?.GroupTables?.length > 0 : false;
  resetIdCounter();

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
                <Tab>{t(SoccerResourceKey.TABLE)}</Tab>
              )}
              <Tab>{t(SoccerResourceKey.FIXTURE)}</Tab>
            </TabList>
          </div>
          {league?.GroupTables && isShowTableTab && (
            <TabPanel>
              <LeagueTableComponent leagueTable={league} homeTeamId="" awayTeamId="" />
            </TabPanel>
          )}
          <TabPanel>
            FIXTURES
        </TabPanel>
        </Tabs>
      </>
    </Layout>
  );
};

SoccerLeagueDetailPage.getInitialProps = async ({ query }) => {
  const { id, seasonId, groupName, leagueGroupName, countryCode } = query;
  const league = await SoccerAPI.GetLeagueTable(id as string, seasonId as string, roundGroup as string);
  const allMatches = await SoccerAPI.GetFixtures(id as string, seasonId as string, groupName as string);

  const isFixture = (match: SoccerMatch) =>
    MatchStatusHelper.isLiveMatch(match.MatchStatus) ||
    MatchStatusHelper.isNotStarted(match.MatchStatus) ||
    new Date(match.EventDate[0]).getTime() > Date.now();

  const compareTwoSoccerMatchByEventTime = (a: SoccerMatch, b: SoccerMatch) =>
    new Date(a.EventDate[0]).getTime() - new Date(b.EventDate[0]).getTime();

  const orderedMatches = [...allMatches].sort(compareTwoSoccerMatchByEventTime);
  const fixtures = orderedMatches.filter(isFixture);
  const results = orderedMatches.filter((match) => !isFixture(match));

  return {
    leagueId: id,
    seasonId,
    groupName,
    namespacesRequired: [ResourceType.SOCCER],
    league,
    leagueGroupName,
    countryCode,
    fixtures,
    results
  };
};

export default withLoadingPage(SoccerLeagueDetailPage);
