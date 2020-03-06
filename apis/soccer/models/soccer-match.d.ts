import { MatchStatus } from "../../../common/enums/match-status-type";
import { EventType } from "../../../common/enums/event-type";
import { MatchPeriod } from "./match-period";
import { LeagueRoundType } from "../../../common/enums/league-round-type";
import { Coverage } from "./coverage";
import { Enumeration } from "./enumeration";

export interface SoccerMatch {
  Id: string,
  EventDate: Any[],
  CurrentPeriodStartTime: Any[],
  LeagueId: string,
  LeagueName: string,
  HomeTeamId: string,
  HomeTeamName: string,
  AwayTeamId: string,
  AwayteamName: string,
  MatchStatus: Enumeration,
  EventStatus: Enumeration,
  HomeScore: number,
  AwayScore: number,
  WinnerId: string,
  AggregateWinnerId: string,
  AggregateHomeScore: number,
  AggredateAwayScore: number,
  HomeRedCards: number,
  HomeYellowRedCards: number,
  AwayRedCards: number,
  AwayYellowRedCards: number,
  MatchTime: number,
  StoppageTime: string,
  InjuryTimeAnnounced: string,
  LastTimelineType: EventType,
  MatchPeriods: MatchPeriod[],
  CountryCode: string,
  CountryName: string,
  ModifiedTime: Date,
  IsInternationalLeague: boolean,
  LeagueOrder: number,
  LeagueSeasonId: string,
  LeagueRoundType: LeagueRoundType,
  LeagueRoundName: string,
  LeagueRoundNumber: number,
  LeagueRoundGroup: string,
  LeagueGroupName: string,
  Coverage: Coverage,
  LeagueHasStandings: boolean,
  GroupName: string
}