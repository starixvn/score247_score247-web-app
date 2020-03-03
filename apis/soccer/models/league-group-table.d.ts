import { LeagueGroupNote } from "./league-group-note";
import { TeamStanding } from "./team-standing";
import { Enumeration } from "./enumeration";

export interface LeagueGroupTable{
    Id: string;
    Name: string;
    GroupNotes: LeagueGroupNote[];
    TeamStandings: TeamStanding[];
    OutcomeList: TeamOutcome[];
}