import React from "react";
import { MatchCommentary } from "../../../../../apis/soccer/models";
import { EventTypes } from '../../../../../common/enums/event-type';
import { SoccerGoalMethod } from '../../../../../common/enums/soccer-goal-method';

type Props = {
    comment: MatchCommentary
};

const eventClass = (comment: MatchCommentary) => {
    switch (comment.TimelineType.Value) {
        case EventTypes.SCORE_CHANGE.value:
            if (comment.GoalScorer.Method === SoccerGoalMethod.OWN_GOAL) {
                return "own-goal";
            } else if (comment.GoalScorer.Method === SoccerGoalMethod.PENALTY) {
                return "penalty-goal";
            }
            return "goal";

        case EventTypes.RED_CARD.value:
            return "red-card";

        case EventTypes.YELLOW_CARD.value:
            return "yellow-card";

        case EventTypes.YELLOW_RED_CARD.value:
            return "yellow-red-card";

        default:
            return "";
    }
};

const CommentaryCell: React.FC<Props> = (props: Props) => {
    return (
        <div className="commentary-cell">
            <span className={eventClass(props.comment)}></span><span>{props.comment.Commentaries.join(".")}</span>
        </div>
    );
};

export default CommentaryCell;