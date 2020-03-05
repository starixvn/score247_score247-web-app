import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ResourceType, SoccerResourceKey } from "../../../../common/resources";
import Advertisement from "../../../common/advertisement";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import GeneralInfo from "../general-info";
import OtherInfo from "../other-info";
import TeamLineUps from "./team-lineups";
import BallTracker from "../ball-tracker";
import SportRadarWidget, { WidgetTab } from "../sportradar-widget";
import Card from "../../../common/basic/card";
import LeagueTable from "../league-table";
import Commentary from "../commentary";
import { Props } from "./type";

const Desktop: React.FC<Props> = props => {
  const [selectedTabIndex, setTab] = useState(0);
  const { t } = useTranslation(ResourceType.SOCCER);
  const maxNumberOfSubstitutionEvent = props.matchLineUps?.Id
    ? props.matchLineUps.Home?.SubstitutionEvents?.length -
        props.matchLineUps.Away?.SubstitutionEvents?.length >
      0
      ? props.matchLineUps.Home?.SubstitutionEvents?.length
      : props.matchLineUps.Away?.SubstitutionEvents?.length
    : 0;

  const maxNumberOfSubstitutePlayers = props.matchLineUps?.Id
    ? props.matchLineUps.Home?.Substitutions?.length -
        props.matchLineUps.Away?.Substitutions?.length >
      0
      ? props.matchLineUps.Home?.Substitutions?.length
      : props.matchLineUps.Away?.Substitutions?.length
    : 0;

  const isShowingSubstitutionEvents = props.matchLineUps?.Id
    ? props.matchLineUps.Home.SubstitutionEvents?.some(x => x) ||
      props.matchLineUps.Away.SubstitutionEvents?.some(x => x)
    : false;

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
            {props.leagueTable?.GroupTables?.length && (
              <Tab>{t(SoccerResourceKey.TABLE)}</Tab>
            )}
          </TabList>
        </div>
        <TabPanel>
          <div className="info-tab">
            <div className="line-ups left">
              {props.matchLineUps?.Id && (
                <TeamLineUps
                  maxNumberOfSubstitutionEvent={maxNumberOfSubstitutionEvent}
                  lineups={props.matchLineUps.Home}
                  pitchView={props.matchLineUps.PitchView}
                  maxNumberOfSubstitutePlayers={maxNumberOfSubstitutePlayers}
                  isShowingSubstitutionEvents={isShowingSubstitutionEvents}
                />
              )}
            </div>
            <div className="center">
              <BallTracker matchId={props.matchInfo.Match.Id} />
              {(props.matchInfo.Venue ||
                props.matchInfo.Referee ||
                props.matchInfo.Attendance > 0) && (
                <Card
                  title={t(SoccerResourceKey.MATCH_INFO)}
                  titleIcon={"icon-info"}
                >
                  <OtherInfo matchInfo={props.matchInfo} />
                </Card>
              )}
              <Card>
                <SportRadarWidget
                  matchId={props.matchInfo.Match.Id}
                  widgetId="sr-widget-timeline"
                  tabName={WidgetTab.TIMELINE}
                  className="timeline"
                />
              </Card>
            </div>
            <div className="line-ups right">
              {props.matchLineUps?.Id && (
                <TeamLineUps
                  maxNumberOfSubstitutionEvent={maxNumberOfSubstitutionEvent}
                  lineups={props.matchLineUps.Away}
                  pitchView={props.matchLineUps.PitchView}
                  maxNumberOfSubstitutePlayers={maxNumberOfSubstitutePlayers}
                  isShowingSubstitutionEvents={isShowingSubstitutionEvents}
                />
              )}
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <Commentary
            matchId={props.matchInfo.Match.Id}
            date={props.matchInfo.Match.EventDate[0]}
          />
        </TabPanel>
        <TabPanel>
          <SportRadarWidget
            matchId={props.matchInfo.Match.Id}
            widgetId="sr-widget-statistics"
            tabName={WidgetTab.STATISTICS}
            className="statistics"
          />
        </TabPanel>
        <TabPanel>
          <SportRadarWidget
            matchId={props.matchInfo.Match.Id}
            widgetId="sr-widget-headToHead"
            tabName={WidgetTab.H2H}
          />
        </TabPanel>
        {props.leagueTable?.GroupTables?.length && (
          <TabPanel>
            <LeagueTable
              leagueTable={props.leagueTable}
              homeTeamId={props.matchInfo.Match.HomeTeamId}
              awayTeamId={props.matchInfo.Match.AwayTeamId}
            />
          </TabPanel>
        )}
      </Tabs>
    </>
  );
};

export default Desktop;
