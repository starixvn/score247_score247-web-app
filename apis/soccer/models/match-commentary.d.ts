import { Enumeration } from "./enumeration";
import { Commentary } from "./commentary";
import { GoalScorer } from "./goal-scorer";
import { Outcome } from "./outcome";

export interface MatchCommentary {
    TimelineId: string;
    TimelineType: Enumeration;
    Time: Any[],
    MatchTime: number;
    StoppageTime: string;
    Commentaries: Commentary[];
    GoalScorer: GoalScorer;
    IsPenaltyShootOutScored: boolean;
    Outcome: Outcome;
}