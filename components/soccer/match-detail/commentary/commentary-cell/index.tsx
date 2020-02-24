import React from "react";
import { MatchCommentary } from "../../../../../apis/soccer/models";
import { EventTypes } from '../../../../../common/enums/event-type';

type Props = {
    comment: MatchCommentary
};

const eventClass = (eventType: number) => {
    switch (eventType) {
    }
};

const CommentaryCell: React.FC<Props> = (props: Props) => {


    return (
        <div className="commentary-cell">
            {props.comment.Commentaries.join(".")}
        </div>
    );
};

export default CommentaryCell;