import React from "react";
import {MatchCommentary} from "../../../../../apis/soccer/models";
import TimeCell from '../time-cell';
import CommentaryCell from '../commentary-cell';
import {EventTypes} from '../../../../../common/enums/event-type';
import {SoccerGoalMethod} from '../../../../../common/enums/soccer-goal-method';

type Props = {
    comment: MatchCommentary;
};

type IconHolder = {
    [key: number]: any;
};

const icons: IconHolder = {
    [EventTypes.RED_CARD.value]: <span className="red-card"/>,
    [EventTypes.YELLOW_CARD.value]: <span className="yellow-card"/>,
    [EventTypes.YELLOW_RED_CARD.value]: (
        <div className="yellow-to-red">
            <span className="yellow-card"/>
            <span className="red-card"/>
        </div>
    ),
    [EventTypes.PENALTY_MISSED.value]: (
        <div className="miss-penalty">
            <img src="/static/images/miss-penalty.svg"/>
        </div>
    ),
    [EventTypes.SUBSTITUTION.value]: (
        <div className="substitution">
            <span className="icon-arrow-down1"/>
            <span className="icon-arrow-up"/>
        </div>
    ),
    [EventTypes.VIDEO_ASSISTANT_REFEREE.value]: <span className="icon-var"/>,
    [EventTypes.VIDEO_ASSISTANT_REFEREE_OVER.value]: <span className="icon-var"/>,
    [EventTypes.CANCELLED_VIDEO_ASSISTANT_REFEREE.value]: <span className="icon-var"/>,
    [EventTypes.POSSIBLE_VIDEO_ASSISTANT_REFEREE.value]: <span className="icon-var"/>
};

const getIcon = (comment: MatchCommentary) => {
    if (comment.TimelineType.Value === EventTypes.SCORE_CHANGE.value) {
        if (comment.GoalScorer.Method === SoccerGoalMethod.OWN_GOAL) {
            return <span className="icon-own-goal"/>;
        } else if (comment.GoalScorer.Method === SoccerGoalMethod.PENALTY) {
            return <span className="icon-goal-pen"/>;
        }
        return <span className="icon-goal"/>;
    } else {
        return icons[comment.TimelineType.Value];
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
};

const CommentaryRow: React.FC<Props> = (props: Props) => {
    const icon = getIcon(props.comment);
    const commentContent = getCommentContent(props.comment);
    const specialEvent = icon ? 'special-event' : '';

    return commentContent.length !== 0 ? (
        <div className={`commentary-row ${specialEvent}`}>
            <TimeCell comment={props.comment}/>
            <div className="commentary-icon-cell">
                {icon}
            </div>
            <CommentaryCell comment={commentContent}/>
        </div>
    ) : null;
};

export default CommentaryRow;
