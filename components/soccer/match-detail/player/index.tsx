import React from "react";
import { Player } from "../../../../apis/soccer/models";

type Props = {
    player: Player;
};

const PlayerRow: React.FC<Props> = props => {
    const { player } = props;

    return (
        <div className="player">
            <div className="jersey">{player.JerseyNumber}.</div>
            <div className="name">{player.Name}</div>
        </div>
    );
};

export default PlayerRow;