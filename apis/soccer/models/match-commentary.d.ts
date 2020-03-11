import { Enumeration } from "./enumeration";
import { Commentary } from "./commentary";
import { GoalScorer } from "./goal-scorer";

export interface MatchCommentary {
    TimelineId: string;
    TimelineType: Enumeration;
    Time: Any[],
    MatchTime: number;
    StoppageTime: string;
    Commentaries: Commentary[];
    GoalScorer: GoalScorer;
    IsPenaltyShootOutScored: boolean;
}