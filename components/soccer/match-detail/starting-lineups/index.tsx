import React from "react";
import { Player } from "../../../../apis/soccer/models";
import PlayerRow from "../player-row";

type Props = {
  lineups: Player[];
};

export default function StartingLineups(props: Props) {
  const { lineups } = props;
  return (
    <div className="line-ups">
      {
        lineups.map(player => <PlayerRow player={player} key={player.Id} isMainPlayer={true} />)
      }
    </div>
  );
}
