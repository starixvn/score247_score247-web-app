import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ResourceType, SoccerResourceKey } from "../../../../common/resources";
import Advertisement from "../../../common/advertisement";
import GeneralInfo from "../general-info";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import BallTracker from "../ball-tracker";
import Card from "../../../common/basic/card";
import { MatchInfo } from "../../../../apis/soccer/models/match-info";
import { MatchLineups } from "../../../../apis/soccer/models";
import TeamLineUps from "./team-lineups";
import OtherInfo from "../other-info";
import SportRadarWidget from "../sportradar-widget";

type Props = {
  matchInfo: MatchInfo;
  matchLineUps: MatchLineups | null;
};

const Desktop: React.FC<Props> = props => {
  const [selectedTabIndex, setTab] = useState(0);
  const { t } = useTranslation(ResourceType.SOCCER);

  return (
    <>
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
      <GeneralInfo match={props.matchInfo.Match} />
      <Tabs selectedIndex={selectedTabIndex} onSelect={setTab}>
        <div>
          <TabList>
            <Tab>Info</Tab>
            <Tab>Commentary</Tab>
            <Tab>Statistics</Tab>
            <Tab>H2H</Tab>
            <Tab>Table</Tab>
          </TabList>
        </div>
        <TabPanel>
          <div className="info-tab">
            <div className="line-ups left">
              {props.matchLineUps?.Id && (<TeamLineUps lineups={props.matchLineUps.Home} pitchView={props.matchLineUps.PitchView} />)}
            </div>
            <div className="center">
              <BallTracker matchId={props.matchInfo.Match.Id} />
              <Card>
                <SportRadarWidget matchId={props.matchInfo.Match.Id} widgetId="sr-widget-timeline" tabName="timeline" disablePitch={true} />
              </Card>
              <Card title={t(SoccerResourceKey.MATCH_INFO)}>
                <OtherInfo matchInfo={props.matchInfo} />
              </Card>
            </div>
            <div className="line-ups right">
              {props.matchLineUps?.Id && (<TeamLineUps lineups={props.matchLineUps.Away} pitchView={props.matchLineUps.PitchView} />)}
            </div>
          </div>
        </TabPanel>
        <TabPanel>This is Commentary page</TabPanel>
        <TabPanel>
          <SportRadarWidget matchId={props.matchInfo.Match.Id} widgetId="sr-widget-statistics" tabName="statistics" disablePitch={true} />
        </TabPanel>
        <TabPanel>
          <SportRadarWidget matchId={props.matchInfo.Match.Id} widgetId="sr-widget-headToHead" tabName="headToHead" disablePitch={true} />
        </TabPanel>
        <TabPanel>
          <SportRadarWidget matchId={props.matchInfo.Match.Id} widgetId="sr-widget-standings" tabName="standings" disablePitch={true} />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default Desktop;
