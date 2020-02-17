import React, { useState } from "react";
import GeneralInfo from "../general-info";
import BallTracker from "../ball-tracker";
import { MatchInfo } from "../../../../apis/soccer/models/match-info";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import SwipeableViews from "react-swipeable-views";
import { MatchLineups } from "../../../../apis/soccer/models";

type Props = {
  matchInfo: MatchInfo;
  matchLineUps: MatchLineups | null;
};

const Mobile: React.FC<Props> = props => {
  const [selectedTabIndex, setTab] = useState(0);

  return (
    <>
      <GeneralInfo match={props.matchInfo.Match} />
      <Tabs selectedIndex={selectedTabIndex} onSelect={setTab}>
        <TabList>
          <Tab>Info</Tab>
          <Tab>Tracker</Tab>
          <Tab>Stats</Tab>
          <Tab>Line-ups</Tab>
          <Tab>H2H</Tab>
          <Tab>Table</Tab>
        </TabList>
        <SwipeableViews
          index={selectedTabIndex}
          onChangeIndex={setTab}
          enableMouseEvents
        >
          <TabPanel>This is Info Page</TabPanel>
          <TabPanel forceRender={true}>
          <div className="info-tab">
            <BallTracker matchId={props.matchInfo.Match.Id} />
          </div>
          </TabPanel>
          <TabPanel>This is Stats page</TabPanel>
          <TabPanel>This is Line-ups page</TabPanel>
          <TabPanel>This is H2H page</TabPanel>
          <TabPanel>This is Table page</TabPanel>
        </SwipeableViews>
      </Tabs>
    </>
  );
};

export default Mobile;
