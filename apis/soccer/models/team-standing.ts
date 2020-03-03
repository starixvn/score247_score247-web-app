import { Enumeration } from "./enumeration";

export interface TeamStanding {
  Id: string;
  Name: string;
  Rank: number;
  Outcome: Enumeration;
  Played: number;
  Win: number;
  Draw: number;
  Loss: number;
  GoalsFor: number;
  GoalsAgainst: number;
  GoalDiff: number;
  Points: number;
  Change: number;
}
