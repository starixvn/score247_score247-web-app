import { MatchPeriod } from "../../../../apis/soccer/models";

export type Props = {
    homeScore: number;
    awayScore: number;
    firstHalfPeriod?: MatchPeriod;
    matchStatusId?: number;
    eventStatusId?: number;
};