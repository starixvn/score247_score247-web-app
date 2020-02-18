import React, { useState } from "react";
import GeneralInfo from "../general-info";
import BallTracker from "../ball-tracker";
import { MatchInfo } from "../../../../apis/soccer/models/match-info";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import SwipeableViews from "react-swipeable-views";
import { MatchLineups } from "../../../../apis/soccer/models";
import PitchView from "../pitch-view";
import StartingLineups from "../starting-lineups";
import SubstitutePlayers from "../substitute-players";
import SubstitutionMobileView from '../substitution/mobile-view';

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
          <TabPanel>
            {props.matchLineUps && (
              <>
                {props.matchLineUps.PitchView ? (
                  <PitchView pitchView={props.matchLineUps.PitchView} />
                ) : (
                    <>
                      <div>line-ups</div>
                      <div>
                        <StartingLineups
                          lineUps={props.matchLineUps.Home.Players}
                        />
                        <StartingLineups
                          lineUps={props.matchLineUps.Away.Players}
                        />
                      </div>
                    </>
                  )}
                <div>substitutions</div>
                <div>
                  <SubstitutionMobileView
                    homeSubstitutionEvents={props.matchLineUps.Home.SubstitutionEvents}
                    awaySubstitutionEvents={props.matchLineUps.Away.SubstitutionEvents}
                  />
                </div>
                <div>substitute players</div>
                <div>
                  <SubstitutePlayers substitutePlayers={props.matchLineUps.Home.Substitutions} />
                  <SubstitutePlayers substitutePlayers={props.matchLineUps.Away.Substitutions} />
                </div>
              </>
            )}
          </TabPanel>
          <TabPanel>This is H2H page</TabPanel>
          <TabPanel>This is Table page</TabPanel>
        </SwipeableViews>
      </Tabs>
    </>
  );
};

export default Mobile;
