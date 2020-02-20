import "./style.scss";
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
import Substitution from '../substitution';
import Card from "../../../common/basic/card";
import { ResourceType, SoccerResourceKey } from "../../../../common/resources";
import { useTranslation } from "react-i18next";
import TeamCoach from "../coach";
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
      <SportRadarWidget matchId={props.matchInfo.Match.Id} widgetId="sr-widget" widgetName="match.lmtPlus" />
      {/* <Tabs selectedIndex={selectedTabIndex} onSelect={setTab}>
        <TabList>
          <Tab>Info</Tab>
          <Tab>Tracker</Tab>
          <Tab>Stats</Tab>
          <Tab>Line-ups</Tab>
          <Tab>H2H</Tab>
          <Tab>Table</Tab>
        </TabList>
        <SwipeableViews index={selectedTabIndex} onChangeIndex={setTab} enableMouseEvents>
          <TabPanel>This is Info Page</TabPanel>
          <TabPanel forceRender={true}>
            <div className="info-tab">
              <BallTracker matchId={props.matchInfo.Match.Id} />
            </div>
          </TabPanel>
          <TabPanel>This is Stats page</TabPanel>
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
                <Card title={t(SoccerResourceKey.SUBSTITUTION)} titleIcon={"icon-substitution"}>
                  <div className="line-ups-wrapper">
                    <Substitution substitutionEvents={props.matchLineUps.Home.SubstitutionEvents} />
                    <Substitution substitutionEvents={props.matchLineUps.Away.SubstitutionEvents} />
                  </div>
                </Card>
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
          <TabPanel>This is H2H page</TabPanel>
          <TabPanel>This is Table page</TabPanel>
        </SwipeableViews>
      </Tabs> */}
    </>
  );
};

export default Mobile;
