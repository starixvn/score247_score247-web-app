import React from "react";
import { MatchCommentary } from "../../../../../apis/soccer/models";

type Props = {
    comment: MatchCommentary
};

const BuildEventTime = (comment: MatchCommentary) => comment.MatchTime > 0
    ? (!comment.StoppageTime ? `${comment.MatchTime}'` : `${comment.MatchTime}'+${comment.StoppageTime}`)
    : ''

const TimeCell: React.FC<Props> = (props: Props) =>
    <div className="time-cell">
        <span>{BuildEventTime(props.comment)}</span>
    </div>;

export default TimeCell;