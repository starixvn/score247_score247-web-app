import React from "react";
import { MatchCommentary } from '../../../../apis/soccer/models';
import CommentaryRow from './commentary-row';

type Props = {
    comments: MatchCommentary[] | null;
};

const Commentary: React.FC<Props> = (props: Props) => {
    return (
        <div>
            {props.comments?.map(x => <CommentaryRow comment={x} key={x.TimelineId} />)}
        </div>
    );
};

export default Commentary;