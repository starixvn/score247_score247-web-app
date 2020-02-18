import React from "react";
import { Coach } from "../../../../apis/soccer/models";

type Props = {
  coach: Coach;
};

export default function TeamCoach(props: Props) {
  return <div className="coach">{props.coach.Name}</div>;
}
