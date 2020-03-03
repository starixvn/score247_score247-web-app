import React from "react";
import { MatchCommentary } from "../../../../../apis/soccer/models";
import TimeCell from '../time-cell';
import CommentaryCell from '../commentary-cell';
import CommentaryIconCell from "../commentary-icon-cell";
import { EventTypes } from '../../../../../common/enums/event-type';
import { SoccerGoalMethod } from '../../../../../common/enums/soccer-goal-method';

type Props = {
    comment: MatchCommentary
};

const getEventClass = (comment: MatchCommentary) => {
    switch (comment.TimelineType.Value) {
        case EventTypes.SCORE_CHANGE.value:
            if (comment.GoalScorer.Method === SoccerGoalMethod.OWN_GOAL) {
                return "icon-own-goal";
            } else if (comment.GoalScorer.Method === SoccerGoalMethod.PENALTY) {
                return "icon-penalty-goal";
            }
            return "icon-goal";
        
        case EventTypes.RED_CARD.value:
            return "icon-red-card";

        case EventTypes.YELLOW_CARD.value:
            return "icon-yellow-card";

        case EventTypes.YELLOW_RED_CARD.value:
            return "yellow-red-card";

        case EventTypes.PENALTY_MISSED.value:
            return "penalty-missed"

        case EventTypes.SUBSTITUTION.value:
            return "icon-substitute-player";
        default:
            return "";
    }
};

const getCommentContent = (comment: MatchCommentary) => {
    let content;
    if (comment.Commentaries && comment.Commentaries.length > 0) {
        content = comment.Commentaries.map(x => x.Text).join(".");
    } else {
        content = "";
    }

    return content;
}

const CommentaryRow: React.FC<Props> = (props: Props) => {
    const eventClass = getEventClass(props.comment);
    const commentContent = getCommentContent(props.comment)
    const specialEvent = eventClass.length !== 0 ? 'special-event' : ''
    
    const component = commentContent.length !== 0 ? (
        <div className={`commentary-row ${specialEvent}`}>
            <TimeCell comment={props.comment} />
            <CommentaryIconCell icon={eventClass}/>
            <CommentaryCell comment={commentContent}/>
        </div>
    ): null;

    return component
}

export default CommentaryRow;