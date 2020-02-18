import React from "react";
import { Player } from "../../../../apis/soccer/models";
import PlayerRow from "../player-row";

type Props = {
  lineUps: Player[];
};

export default function StartingLineups(props: Props) {
  const { lineUps } = props;
  return (
    <div className="line-ups">
      {
        lineUps.map(player => <PlayerRow player={player} key={player.Id} />)
      }
    </div>
  );
}
