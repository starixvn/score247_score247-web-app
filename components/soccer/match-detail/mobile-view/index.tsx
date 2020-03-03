import "./style.scss";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ResourceType, SoccerResourceKey } from "../../../../common/resources";
import GeneralInfo from "../general-info";
import SwipeableViews from "react-swipeable-views";
import { MatchInfo } from "../../../../apis/soccer/models/match-info";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { MatchLineups, MatchCommentary } from "../../../../apis/soccer/models";
import PitchView from "../pitch-view";
import StartingLineups from "../starting-lineups";
import TeamCoach from "../coach";
import Card from "../../../common/basic/card";
import OtherInfo from "../other-info";
import BallTracker from "../ball-tracker";
import SportRadarWidget, { WidgetTab } from "../sportradar-widget";
import Commentary from '../commentary';
import MobileSubstitution from '../mobile-substitution';
import MobileSubstitutePlayers from '../mobile-substitute-players';
import MobileStartingLineups from '../mobile-starting-lineups';

type Props = {
  matchInfo: MatchInfo;
  matchLineUps: MatchLineups | null;
  matchCommentaries: MatchCommentary[] | null;
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
            {(matchInfo.Venue || matchInfo.Referee || matchInfo.Attendance > 0) &&
              (<Card title={t(SoccerResourceKey.MATCH_INFO)} titleIcon={"icon-info"}>
                <OtherInfo matchInfo={matchInfo} />
              </Card>)
            }
            <Card>
              <SportRadarWidget matchId={matchInfo.Match.Id} widgetId="sr-widget-timeline" tabName={WidgetTab.TIMELINE} className="timeline" />
            </Card>
          </TabPanel>
          <TabPanel>
            <BallTracker matchId={matchInfo.Match.Id} />
            {props.matchCommentaries?.some(x => x) && <Commentary comments={props.matchCommentaries} />}
          </TabPanel>
          <TabPanel>
            <SportRadarWidget matchId={matchInfo.Match.Id} widgetId="sr-widget-statistics" tabName={WidgetTab.STATISTICS} className="statistics" />
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
                      <div className="empty"></div>
                    </Card>
                  )
                  : (
                    <Card title={t(SoccerResourceKey.LINE_UPS)}>
                        <MobileStartingLineups matchLineups={matchLineUps} />
                    </Card>
                  )
                }
                {(matchLineUps.Home.SubstitutionEvents?.some(x => x) || matchLineUps.Away.SubstitutionEvents?.some(x => x))
                  && (<Card title={t(SoccerResourceKey.SUBSTITUTION)} titleIcon={["icon-arrow-down1", "icon-arrow-up"]} className="substitution">                    
                      <MobileSubstitution matchLineups={matchLineUps} />
                  </Card>)}
                <Card title={t(SoccerResourceKey.SUBSTITUTE_PLAYERS)} titleIcon={"icon-substitute-player"} className="substitute-player">                  
                    <MobileSubstitutePlayers matchLineups={matchLineUps} />
                </Card>
                <Card className="coach" title={t(SoccerResourceKey.COACH)} titleIcon={"icon-account"}>
                  <div className="mobile-lineups-row">
                    <TeamCoach coach={matchLineUps.Home.Coach} />
                    <TeamCoach coach={matchLineUps.Away.Coach} />
                  </div>
                </Card>
              </>
            )}
          </TabPanel>
          <TabPanel>
            <SportRadarWidget matchId={props.matchInfo.Match.Id} widgetId="sr-widget-headToHead" tabName={WidgetTab.H2H} className="h2h" />
          </TabPanel>
          <TabPanel>
            <SportRadarWidget matchId={props.matchInfo.Match.Id} widgetId="sr-widget-standings" tabName={WidgetTab.STANDINGS} />
          </TabPanel>
        </SwipeableViews>
      </Tabs>
    </>
  );
};

export default Mobile;
