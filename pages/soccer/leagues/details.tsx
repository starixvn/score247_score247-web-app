import "./styles.scss";
import React, { useState } from "react";
import Layout from "../../../components/layout";
import { LocalizedPage } from "../../../common/helpers/Localizer";
import withLoadingPage from "../../../hoc/with-loading-page";
import { CommonResourceKey, ResourceType, SoccerResourceKey } from "../../../common/resources";
import appSettings from '../../../app-settings';
import { SoccerAPI } from '../../../apis/soccer/soccer-api';
import { Tabs, TabList, Tab, TabPanel, resetIdCounter } from 'react-tabs';
import LeagueTableComponent from '../../../components/soccer/match-detail/league-table';
import { LeagueTable } from '../../../apis/soccer/models';
import Advertisement from '../../../components/common/advertisement';
import LeagueInfo from '../../../components/soccer/league-info';
import { SoccerMatch } from "../../../apis/soccer/models/soccer-match";
import { MatchStatusHelper } from "../../../common/enums/match-status-type";

type Props = {
  leagueId: string | string[];
  seasonId: string | string[];
  groupName: string | string[];
  league?: LeagueTable;
  fixtures: SoccerMatch[];
  results: SoccerMatch[];
};

const SoccerLeagueDetailPage: LocalizedPage<Props> = props => {
  const { t, league } = props;
  const [selectedTabIndex, setTab] = useState(0);
  resetIdCounter();

  return (
    <Layout
      title={t(CommonResourceKey.SOCCER)}
      breadcrumbs={[
        t(CommonResourceKey.SOCCER),
        t(SoccerResourceKey.MATCH_INFO, { ns: ResourceType.SOCCER })
      ]}
    >
      <SoccerBanner />
      <div className="banner-top">
        <div className="banner-left">
          <Advertisement
            imageSrc="/static/images/ads-banner-detail-2.png"
            href="#"
          />
        </div>
        <div className="banner-center">
          <Advertisement imageSrc="/static/images/ads-banner-1.png" href="#" />
        </div>
        <div className="banner-right">
          <Advertisement
            imageSrc="/static/images/ads-banner-detail-3.png"
            href="#"
          />
        </div>
      </div>
      <div className="extra-info">
        <div className="league-name">
          <img src={`${appSettings.assetsUrl}/flags/${league?.League?.CountryCode}.svg`} />
          {league?.League?.Name}
        </div>
        <span className="icon-menu-favorites"></span>
      </div>
      <>
        <Tabs selectedIndex={selectedTabIndex} onSelect={setTab}>
          <div>
            <TabList>
              {league?.GroupTables?.length && (
                <Tab>{t(SoccerResourceKey.TABLE)}</Tab>
              )}
              <Tab>{t(SoccerResourceKey.FIXTURE)}</Tab>
            </TabList>
          </div>
          {league?.GroupTables?.length && (
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
  const { id, seasonId, groupName, roundGroup } = query;
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
    seasonId: seasonId,
    groupName: groupName,
    namespacesRequired: [ResourceType.SOCCER],
    league: league,
    fixtures,
    results
  };
};

export default withLoadingPage(SoccerLeagueDetailPage);
