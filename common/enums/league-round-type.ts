export class LeagueRoundType {
  constructor(public readonly value: number, public readonly displayName: string) {
  }
}

export const LeagueRoundTypes = {
  CUP: new LeagueRoundType(1, "cup"),
  GROUP: new LeagueRoundType(2, "group"),
  PLAY_OFF: new LeagueRoundType(3,"playoff"),
  QUALIFIER: new LeagueRoundType(4, "qualification"),
  VARIABLE: new LeagueRoundType(5, "variable"),
  UNKNOWN: new LeagueRoundType(6, "unknown")
};