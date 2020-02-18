import { TeamLineups } from "./team-lineups";

export interface MatchLineups {
    Id: string;
    EventDate: any[];
    Home: TeamLineups;
    Away: TeamLineups;
    PitchView: string;
}