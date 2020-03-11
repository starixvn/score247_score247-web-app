import { Enumeration } from "./enumeration";
import { GoalScorer } from "./goal-scorer";
import { Player } from "./player";
import { Commentary } from "./commentary";

export interface TimelineEvent {
  Id: string;
  CreatedTime: Date;
  ModifiedTime: Date;
  Type: Enumeration;
  Time: Date;
  MatchTime: number;
  StoppageTime: string;
  Team: string;
  Period: number;
  PeriodType: Enumeration;
  HomeScore: number;
  AwayScore: number;
  GoalScorer: GoalScorer;
  Assist: Player;
  Player: Player;
  InjuryTimeAnnounced: number;
  IsHome: boolean;
  Commentaries: Commentary[];
  PlayerOut: Player;
  PlayerIn: Player;
  HomeShootoutPlayer: Player;
  IsHomeShootoutScored: boolean;
  AwayShootoutPlayer: Player;
  IsAwayShootoutScored: boolean;
  ShootoutHomeScore: number;
  ShootoutAwayScore: number;
  PenaltyStatus: string;
}
