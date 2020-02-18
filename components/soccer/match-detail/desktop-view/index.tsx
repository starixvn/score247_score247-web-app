import React, { useState } from "react";
import GeneralInfo from "../general-info";
import BallTracker from "../ball-tracker";
import { MatchInfo } from "../../../../apis/soccer/models/match-info";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Advertisement from "../../../common/advertisement";
import { MatchLineups } from "../../../../apis/soccer/models";
import TeamLineUps from "./team-lineups";

type Props = {
  matchInfo: MatchInfo;
  matchLineUps: MatchLineups | null;
};

const Desktop: React.FC<Props> = props => {
  const [selectedTabIndex, setTab] = useState(0);

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
        <TabPanel forceRender={true}>
          <div className="info-tab">
            <div className="left-section">
              {props.matchLineUps && (
                <TeamLineUps
                  lineUps={props.matchLineUps.Home}
                  pitchView={props.matchLineUps.PitchView}
                />
              )}
            </div>
            <BallTracker matchId={props.matchInfo.Match.Id} />
            <div className="right-section">
              {props.matchLineUps && (
                <TeamLineUps
                  lineUps={props.matchLineUps.Away}
                  pitchView={props.matchLineUps.PitchView}
                />
              )}
            </div>
          </div>
        </TabPanel>
        <TabPanel>This is Commentary page</TabPanel>
        <TabPanel>This is Statistics page</TabPanel>
        <TabPanel>This is H2H page</TabPanel>
        <TabPanel>This is Table page</TabPanel>
      </Tabs>
    </>
  );
};

export default Desktop;
