import React from "react";
import { Player } from "../../../../apis/soccer/models";
import PlayerRow from "../player-row";

type Props = {
  substitutePlayers: Player[];
  maxNumberOfSubstitutePlayers: number;
};

export default function SubstitutePlayers(props: Props) {
  const { substitutePlayers } = props;
  const numberOfEmptyRow = props.maxNumberOfSubstitutePlayers - props.substitutePlayers.length;
  return (
    <div className="sub-players">
      {
        substitutePlayers.map(sub => <PlayerRow player={sub} isMainPlayer={false} key={sub.Id} />)
      }
      {numberOfEmptyRow > 0 && Array.from(Array(numberOfEmptyRow).keys()).map(x => <div className="empty-player-row" key={x}></div>)}
    </div>
  );
}
