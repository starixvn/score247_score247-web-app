import React from "react";
import { Coach } from "../../../../apis/soccer/models";

type Props = {
  coach: Coach;
};

export default function TeamCoach(props: Props) {
  return <div className="player-row">{props.coach.Name}</div>;
}
