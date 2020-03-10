import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ResourceType, SoccerResourceKey } from "../../../../common/resources";
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
import { SoccerBanner } from '../../banner';
import { MatchLineups } from '../../../../apis/soccer/models';

const maxNumberOfSubstitutionEvent = (matchLineUps?: MatchLineups) =>
  matchLineUps?.Id
    ? matchLineUps.Home?.SubstitutionEvents?.length -
      matchLineUps.Away?.SubstitutionEvents?.length >
      0
      ? matchLineUps.Home?.SubstitutionEvents?.length
      : matchLineUps.Away?.SubstitutionEvents?.length
    : 0;

const maxNumberOfSubstitutePlayers = (matchLineUps?: MatchLineups) =>
  matchLineUps?.Id
    ? matchLineUps.Home?.Substitutions?.length -
      matchLineUps.Away?.Substitutions?.length >
      0
      ? matchLineUps.Home?.Substitutions?.length
      : matchLineUps.Away?.Substitutions?.length
    : 0;

const isShowingSubstitutionEvents = (matchLineUps?: MatchLineups) =>
  matchLineUps?.Id
    ? matchLineUps.Home.SubstitutionEvents?.some(x => x) ||
    matchLineUps.Away.SubstitutionEvents?.some(x => x)
    : false;

const Desktop: React.FC<Props> = props => {
  const [selectedTabIndex, setTab] = useState(0);
  const { t } = useTranslation(ResourceType.SOCCER);

  return (
    <>
      <SoccerBanner />
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
                  maxNumberOfSubstitutionEvent={maxNumberOfSubstitutionEvent(props.matchLineUps)}
                  lineups={props.matchLineUps.Home}
                  pitchView={props.matchLineUps.PitchView}
                  maxNumberOfSubstitutePlayers={maxNumberOfSubstitutePlayers(props.matchLineUps)}
                  isShowingSubstitutionEvents={isShowingSubstitutionEvents(props.matchLineUps)}
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
                  maxNumberOfSubstitutionEvent={maxNumberOfSubstitutionEvent(props.matchLineUps)}
                  lineups={props.matchLineUps.Away}
                  pitchView={props.matchLineUps.PitchView}
                  maxNumberOfSubstitutePlayers={maxNumberOfSubstitutePlayers(props.matchLineUps)}
                  isShowingSubstitutionEvents={isShowingSubstitutionEvents(props.matchLineUps)}
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
