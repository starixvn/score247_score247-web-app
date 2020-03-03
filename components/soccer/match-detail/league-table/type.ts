import {  MatchSummary, LeagueTable } from "../../../../apis/soccer/models";

export type State = {
  leagueTable: LeagueTable | null;
};

export type Props = {
  match: MatchSummary;
};
