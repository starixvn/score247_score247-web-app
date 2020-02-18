import React from "react";
import { Player } from "../../../../apis/soccer/models";
import PlayerRow from "../player-row";

type Props = {
  substitutePlayers: Player[];
};

export default function SubstitutePlayers(props: Props) {
  const { substitutePlayers } = props;
  return (
    <div className="sub-players">
      {
        substitutePlayers.map(sub => <PlayerRow player={sub} isMainPlayer={false} />)
      }
    </div>
  );
}
