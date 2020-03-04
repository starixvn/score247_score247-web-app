import { MatchInfo, MatchLineups, LeagueTable } from "../../../../apis/soccer/models";

export type Props = {
  matchInfo: MatchInfo;
  matchLineUps: MatchLineups | null;
  leagueTable?: LeagueTable;
};
