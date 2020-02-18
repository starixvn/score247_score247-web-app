import "./style.scss";
import React from "react";
import { Player } from "../../../../apis/soccer/models";

type Props = {
    player: Player;
};

const PlayerRow: React.FC<Props> = props => {
    const { player } = props;

    return (
        <div className="player-row">
            <div><span className="jersey">{player.JerseyNumber}.</span>{player.Name}</div>
            <div>IN</div>
        </div>
    );
};

export default PlayerRow;