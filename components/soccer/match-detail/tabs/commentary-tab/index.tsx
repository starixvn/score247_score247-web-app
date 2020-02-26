import React from "react";

type Props = {
    matchId: string;
};

class CommentaryTab extends React.Component<Props> {

    render() {
        return this.props.matchId;
    }
}

export default CommentaryTab;