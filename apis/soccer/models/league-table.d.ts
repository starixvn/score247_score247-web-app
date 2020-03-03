import { League } from "./league";
import { LeagueSeason } from "./league-season";
import { Enumeration } from "./enumeration";
import { LeagueGroupTable } from "./league-group-table";

export interface LeagueTable {
  League: League;
  Type: Enumeration;
  LeagueSeason: LeagueSeason;
  GroupTables: LeagueGroupTable[];
}
