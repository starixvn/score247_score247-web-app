import { Enumeration } from "./enumeration";

export interface Player {
  Id: string;
  Name: string;
  PlayerType: Enumeration;
  JerseyNumber: number;
  Position: Enumeration;
  Order: number;
  EventStatistic: { [key: string]: number };
}
