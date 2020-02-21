import "./style.scss";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ResourceType, SoccerResourceKey } from "../../../../common/resources";
import GeneralInfo from "../general-info";
import SwipeableViews from "react-swipeable-views";
import { MatchInfo } from "../../../../apis/soccer/models/match-info";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { MatchLineups } from "../../../../apis/soccer/models";
import PitchView from "../pitch-view";
import StartingLineups from "../starting-lineups";
import SubstitutePlayers from "../substitute-players";
import Substitution from '../substitution';
import TeamCoach from "../coach";
import Card from "../../../common/basic/card";
import OtherInfo from "../other-info";
import BallTracker from "../ball-tracker";
import SportRadarWidget from "../sportradar-widget";

type Props = {
  matchInfo: MatchInfo;
  matchLineUps: MatchLineups | null;
};

const Mobile: React.FC<Props> = props => {
  const { t } = useTranslation(ResourceType.SOCCER);
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
        <SwipeableViews index={selectedTabIndex} onChangeIndex={setTab} enableMouseEvents>
          <TabPanel>
            <Card title={t(SoccerResourceKey.MATCH_INFO)} titleIcon={"icon-info"}>
              <OtherInfo matchInfo={props.matchInfo} />
            </Card>
            <Card>
              <SportRadarWidget matchId={props.matchInfo.Match.Id} widgetId="sr-widget-timeline" tabName="timeline" disablePitch={true} />
            </Card>
          </TabPanel>
          <TabPanel>
            <BallTracker matchId={props.matchInfo.Match.Id} />
          </TabPanel>
          <TabPanel>
            <SportRadarWidget matchId={props.matchInfo.Match.Id} widgetId="sr-widget-statistics" tabName="statistics" disablePitch={true} />
          </TabPanel>
          <TabPanel>
            {props.matchLineUps?.Id && (
              <>
                {props.matchLineUps.PitchView
                  ? (<Card className="pitch-view-team">
                    <div className="team-info">
                      <span className="team-name">{props.matchLineUps.Home.Name}</span>
                      <span className="formation">{props.matchLineUps.Home.Formation}</span>
                    </div>
                    <PitchView pitchView={props.matchLineUps.PitchView} />
                    <div className="team-info away">
                      <span className="team-name">{props.matchLineUps.Away.Name}</span>
                      <span className="formation">{props.matchLineUps.Away.Formation}</span>
                    </div>
                  </Card>
                  )
                  : (
                    <Card title={t(SoccerResourceKey.LINE_UPS)}>
                      <div className="line-ups-wrapper">
                        <StartingLineups lineups={props.matchLineUps.Home.Players} />
                        <StartingLineups lineups={props.matchLineUps.Away.Players} />
                      </div>
                    </Card>
                  )
                }
                {(props.matchLineUps.Home.SubstitutionEvents?.some(x => x) || props.matchLineUps.Away.SubstitutionEvents?.some(x => x))
                  && (<Card title={t(SoccerResourceKey.SUBSTITUTION)} titleIcon={"icon-substitution"}>
                    <div className="line-ups-wrapper">
                      {props.matchLineUps.Home.SubstitutionEvents?.some(x => x) && <Substitution substitutionEvents={props.matchLineUps.Home.SubstitutionEvents} />}
                      {props.matchLineUps.Away.SubstitutionEvents?.some(x => x) && <Substitution substitutionEvents={props.matchLineUps.Away.SubstitutionEvents} />}
                    </div>
                  </Card>)}
                <Card title={t(SoccerResourceKey.SUBSTITUTE_PLAYERS)} titleIcon={"icon-substitute-player"}>
                  <div className="line-ups-wrapper">
                    <SubstitutePlayers substitutePlayers={props.matchLineUps.Home.Substitutions} />
                    <SubstitutePlayers substitutePlayers={props.matchLineUps.Away.Substitutions} />
                  </div>
                </Card>
                <Card className="coach" title={t(SoccerResourceKey.COACH)} titleIcon={"icon-account"}>
                  <div className="line-ups-wrapper">
                    <TeamCoach coach={props.matchLineUps.Home.Coach} />
                    <TeamCoach coach={props.matchLineUps.Away.Coach} />
                  </div>

                </Card>
              </>
            )}
          </TabPanel>
          <TabPanel>
            <SportRadarWidget matchId={props.matchInfo.Match.Id} widgetId="sr-widget-headToHead" tabName="headToHead" disablePitch={true} />
          </TabPanel>
          <TabPanel>
            <SportRadarWidget matchId={props.matchInfo.Match.Id} widgetId="sr-widget-standings" tabName="standings" disablePitch={true} />
          </TabPanel>
        </SwipeableViews>
      </Tabs>
    </>
  );
};

export default Mobile;
