import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ResourceType, SoccerResourceKey } from "../../../../common/resources";
import Advertisement from "../../../common/advertisement";
import GeneralInfo from "../general-info";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { MatchInfo } from "../../../../apis/soccer/models/match-info";
import { MatchLineups, MatchCommentary } from "../../../../apis/soccer/models";
import TeamLineUps from "./team-lineups";
import OtherInfo from "../other-info";
import BallTracker from "../ball-tracker";
import SportRadarWidget, { WidgetTab } from "../sportradar-widget";
import Card from "../../../common/basic/card";
import Commentary from "../commentary";

type Props = {
  matchInfo: MatchInfo;
  matchLineUps: MatchLineups | null;
};

const Desktop: React.FC<Props> = props => {
  const [selectedTabIndex, setTab] = useState(0);
  const { t } = useTranslation(ResourceType.SOCCER);
  const maxNumberOfSubstitutionEvent = props.matchLineUps?.Id ? (props.matchLineUps.Home?.SubstitutionEvents?.length - props.matchLineUps.Away?.SubstitutionEvents?.length > 0 ?
    props.matchLineUps.Home?.SubstitutionEvents?.length :
    props.matchLineUps.Away?.SubstitutionEvents?.length) : 0;

  const maxNumberOfSubstitutePlayers = props.matchLineUps?.Id ? (props.matchLineUps.Home?.Substitutions?.length - props.matchLineUps.Away?.Substitutions?.length > 0 ?
    props.matchLineUps.Home?.Substitutions?.length :
    props.matchLineUps.Away?.Substitutions?.length) : 0;

  const isShowingSubstitutionEvents = props.matchLineUps?.Id ?
    (props.matchLineUps.Home.SubstitutionEvents?.some(x => x) ||
      props.matchLineUps.Away.SubstitutionEvents?.some(x => x)) :
    false;

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
            <Tab>{t(SoccerResourceKey.INFO)}</Tab>
            <Tab>{t(SoccerResourceKey.COMMENTARY)}</Tab>
            <Tab>{t(SoccerResourceKey.STATISTICS)}</Tab>
            <Tab>{t(SoccerResourceKey.H2H)}</Tab>
            <Tab>{t(SoccerResourceKey.TABLE)}</Tab>
          </TabList>
        </div>
        <TabPanel>
          <div className="info-tab">
            <div className="line-ups left">
              {props.matchLineUps?.Id && (<TeamLineUps
                maxNumberOfSubstitutionEvent={maxNumberOfSubstitutionEvent}
                lineups={props.matchLineUps.Home}
                pitchView={props.matchLineUps.PitchView}
                maxNumberOfSubstitutePlayers={maxNumberOfSubstitutePlayers}
                isShowingSubstitutionEvents={isShowingSubstitutionEvents} />)}
            </div>
            <div className="center">
              <BallTracker matchId={props.matchInfo.Match.Id} />
              {(props.matchInfo.Venue || props.matchInfo.Referee || props.matchInfo.Attendance > 0) &&
                (<Card title={t(SoccerResourceKey.MATCH_INFO)} titleIcon={"icon-info"}>
                  <OtherInfo matchInfo={props.matchInfo} />
                </Card>)
              }
              <Card>
                <SportRadarWidget matchId={props.matchInfo.Match.Id} widgetId="sr-widget-timeline" tabName={WidgetTab.TIMELINE} className="timeline" />
              </Card>
            </div>
            <div className="line-ups right">
              {props.matchLineUps?.Id && (<TeamLineUps
                maxNumberOfSubstitutionEvent={maxNumberOfSubstitutionEvent}
                lineups={props.matchLineUps.Away}
                pitchView={props.matchLineUps.PitchView}
                maxNumberOfSubstitutePlayers={maxNumberOfSubstitutePlayers}
                isShowingSubstitutionEvents={isShowingSubstitutionEvents} />)}
            </div>
          </div>
        </TabPanel>
        <TabPanel><Commentary matchId={props.matchInfo.Match.Id} date={props.matchInfo.Match.EventDate[0]} /></TabPanel>
        <TabPanel>
          <SportRadarWidget matchId={props.matchInfo.Match.Id} widgetId="sr-widget-statistics" tabName={WidgetTab.STATISTICS} className="statistics" />
        </TabPanel>
        <TabPanel>
          <SportRadarWidget matchId={props.matchInfo.Match.Id} widgetId="sr-widget-headToHead" tabName={WidgetTab.H2H} />
        </TabPanel>
        <TabPanel>
          <SportRadarWidget matchId={props.matchInfo.Match.Id} widgetId="sr-widget-standings" tabName={WidgetTab.STANDINGS} />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default Desktop;
