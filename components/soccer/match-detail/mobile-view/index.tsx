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
  const { matchInfo, matchLineUps } = props;

  return (
    <>
      <GeneralInfo match={matchInfo.Match} />
      <Tabs selectedIndex={selectedTabIndex} onSelect={setTab}>
        <TabList>
          <Tab>{t(SoccerResourceKey.INFO)}</Tab>
          <Tab>{t(SoccerResourceKey.TRACKER)}</Tab>
          <Tab>{t(SoccerResourceKey.STATS)}</Tab>
          <Tab>{t(SoccerResourceKey.LINE_UPS)}</Tab>
          <Tab>{t(SoccerResourceKey.H2H)}</Tab>
          <Tab>{t(SoccerResourceKey.TABLE)}</Tab>
        </TabList>
        <SwipeableViews index={selectedTabIndex} onChangeIndex={setTab} enableMouseEvents>
          <TabPanel>
            <Card title={t(SoccerResourceKey.MATCH_INFO)} titleIcon={"icon-info"}>
              <OtherInfo matchInfo={matchInfo} />
            </Card>
            <Card>
              <SportRadarWidget matchId={matchInfo.Match.Id} widgetId="sr-widget-timeline" tabName="timeline" disablePitch={true} />
            </Card>
          </TabPanel>
          <TabPanel>
            <BallTracker matchId={matchInfo.Match.Id} />
          </TabPanel>
          <TabPanel>
            <SportRadarWidget matchId={matchInfo.Match.Id} widgetId="sr-widget-statistics" tabName="statistics" disablePitch={true} />
          </TabPanel>
          <TabPanel>
            {matchLineUps?.Id && (
              <>
                {matchLineUps.PitchView
                  ? (
                    <Card className="pitch-view-team">
                      <div className="team-info">
                        <span className="team-name">{matchLineUps.Home.Name}</span>
                        <span className="formation">{matchLineUps.Home.Formation}</span>
                      </div>
                      <PitchView pitchView={matchLineUps.PitchView} />
                      <div className="team-info away">
                        <span className="team-name">{matchLineUps.Away.Name}</span>
                        <span className="formation">{matchLineUps.Away.Formation}</span>
                      </div>
                    </Card>
                  )
                  : (
                    <Card title={t(SoccerResourceKey.LINE_UPS)}>
                      <div className="line-ups-wrapper">
                        <StartingLineups lineups={matchLineUps.Home.Players} />
                        <StartingLineups lineups={matchLineUps.Away.Players} />
                      </div>
                    </Card>
                  )
                }
                {(matchLineUps.Home.SubstitutionEvents?.some(x => x) || matchLineUps.Away.SubstitutionEvents?.some(x => x))
                  && (<Card title={t(SoccerResourceKey.SUBSTITUTION)} titleIcon={"icon-substitution"}>
                    <div className="line-ups-wrapper">
                      {matchLineUps.Home.SubstitutionEvents?.some(x => x) && <Substitution substitutionEvents={matchLineUps.Home.SubstitutionEvents} />}
                      {matchLineUps.Away.SubstitutionEvents?.some(x => x) && <Substitution substitutionEvents={matchLineUps.Away.SubstitutionEvents} />}
                    </div>
                  </Card>)}
                <Card title={t(SoccerResourceKey.SUBSTITUTE_PLAYERS)} titleIcon={"icon-substitute-player"}>
                  <div className="line-ups-wrapper">
                    <SubstitutePlayers substitutePlayers={matchLineUps.Home.Substitutions} />
                    <SubstitutePlayers substitutePlayers={matchLineUps.Away.Substitutions} />
                  </div>
                </Card>
                <Card className="coach" title={t(SoccerResourceKey.COACH)} titleIcon={"icon-account"}>
                  <div className="line-ups-wrapper">
                    <TeamCoach coach={matchLineUps.Home.Coach} />
                    <TeamCoach coach={matchLineUps.Away.Coach} />
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
