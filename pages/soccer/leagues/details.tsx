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
import { SoccerBanner } from '../../../components/soccer/banner';

type Props = {
  leagueId: string | string[];
  seasonId: string | string[];
  groupName: string | string[];
  league?: LeagueTable;
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
      <div className="league-info">
        <LeagueInfo leagueName={league?.League?.Name} countryCode={league?.League?.CountryCode} />
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
  const { id, seasonId, groupName } = query;
  const league = await SoccerAPI.GetLeagueTable(id as string, seasonId as string, groupName as string);
  return {
    leagueId: id,
    seasonId: seasonId,
    groupName: groupName,
    namespacesRequired: [ResourceType.SOCCER],
    league: league
  };
};

export default withLoadingPage(SoccerLeagueDetailPage);
