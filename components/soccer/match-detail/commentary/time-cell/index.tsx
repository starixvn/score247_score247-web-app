import React from "react";
import { MatchCommentary } from "../../../../../apis/soccer/models";
import { EventTypes } from "../../../../../common/enums/event-type";

type Props = {
    comment: MatchCommentary;
};

const isHideInSomeCase = (comment: MatchCommentary) => comment.TimelineType.Value === EventTypes.BREAK_START.value;

const BuildEventTime = (comment: MatchCommentary) => comment.MatchTime > 0 && !isHideInSomeCase(comment)
    ? (!comment.StoppageTime ? `${comment.MatchTime}'` : `${comment.MatchTime}'+${comment.StoppageTime}`)
    : '';

const TimeCell: React.FC<Props> = (props: Props) =>
    <div className="time-cell">
        <span>{BuildEventTime(props.comment)}</span>
    </div>;

export default TimeCell;