import React from "react";
import { MatchCommentary } from "../../../../../apis/soccer/models";
import TimeCell from '../time-cell';
import CommentaryCell from '../commentary-cell';
import { EventTypes } from '../../../../../common/enums/event-type';
import { SoccerGoalMethod } from '../../../../../common/enums/soccer-goal-method';

type Props = {
    comment: MatchCommentary
};

const getIcon = (comment: MatchCommentary) => {
    switch (comment.TimelineType.Value) {
        case EventTypes.SCORE_CHANGE.value:
            if (comment.GoalScorer.Method === SoccerGoalMethod.OWN_GOAL) {
                return <span className="icon-own-goal" />;
            } else if (comment.GoalScorer.Method === SoccerGoalMethod.PENALTY) {
                return <span className="icon-penalty-goal" />;
            }
            return <span className="icon-goal" />;

        case EventTypes.RED_CARD.value:
            return <span className="icon-red-card" />;

        case EventTypes.YELLOW_CARD.value:
            return <span className="icon-yellow-card" />;

        case EventTypes.YELLOW_RED_CARD.value:
            return <>
                <span className="icon-yellow-card" />
                <span className="icon-red-card" />
            </>;

        case EventTypes.PENALTY_MISSED.value:
            return <>
                <span className="icon-goal" />
                <span />
            </>;

        case EventTypes.SUBSTITUTION.value:
            return <>
                <span className="icon-out" />
                <span className="icon-in" />
            </>;
        default:
            return null;
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
    const icon = getIcon(props.comment);
    const commentContent = getCommentContent(props.comment)
    const specialEvent = icon ? 'special-event' : ''

    const component = commentContent.length !== 0 ? (
        <div className={`commentary-row ${specialEvent}`}>
            <TimeCell comment={props.comment} />
            <div className="commentary-icon-cell">
                {icon}
            </div>
            <CommentaryCell comment={commentContent} />
        </div>
    ) : null;

    return component
}

export default CommentaryRow;