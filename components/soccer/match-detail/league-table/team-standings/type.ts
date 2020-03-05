import { TeamStanding } from "../../../../../apis/soccer/models/team-standing";

export type Props = {
  teamStandings: TeamStanding[];
  homeTeamId: string;
  awayTeamId: string;
};
