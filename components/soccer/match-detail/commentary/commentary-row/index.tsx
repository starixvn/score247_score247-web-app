import React from "react";
import { MatchCommentary } from "../../../../../apis/soccer/models";
import TimeCell from '../time-cell';
import CommentaryCell from '../commentary-cell';

type Props = {
    comment: MatchCommentary
};

const CommentaryRow: React.FC<Props> = (props: Props) =>
    <div className="commentary-row">
        <TimeCell comment={props.comment} />
        <CommentaryCell comment={props.comment} />
    </div>;

export default CommentaryRow;