import React from "react";
import { MatchCommentary } from "../../../../../apis/soccer/models";

type Props = {
    comment: MatchCommentary
};

const CommentaryCell: React.FC<Props> = (props: Props) =>
    <div className="commentary-cell">
        {props.comment.Commentaries.join(".")}
    </div>;

export default CommentaryCell;