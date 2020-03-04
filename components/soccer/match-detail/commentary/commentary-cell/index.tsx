import React from "react";

type Props = {
    comment: string;
};

const CommentaryCell: React.FC<Props> = (props: Props) => (
    <div className="commentary-desc-cell">
        <span>{props.comment}</span>
    </div>);

export default CommentaryCell;