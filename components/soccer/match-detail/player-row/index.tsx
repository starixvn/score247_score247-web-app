import React from "react";
import { Player } from "../../../../apis/soccer/models";

type Props = {
    player: Player;
};

const PlayerRow: React.FC<Props> = props => {
    const { player } = props;

    return (
        <div className="player">
            <span className="jersey">{player.JerseyNumber}.</span>
            <span className="name">{player.Name}</span>
        </div>
    );
};

export default PlayerRow;