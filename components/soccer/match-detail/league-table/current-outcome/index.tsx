import "./style.scss";
import React from "react";
import { TeamOutcome } from "../../../../../apis/soccer/models";
import outcomeColor from "../../../../../common/enums/outcome-color";
import { Props } from "./type";

export default function Outcomes(props: Props) {
  if (props.outcomes.length > 0) {
    return (
      <div>
        {props.outcomes.map(x => (
          <Outcome key={x.Value} {...x} />
        ))}
      </div>
    );
  }

  return null;
}

export function Outcome(outcome: TeamOutcome) {
  return (
    <div className="outcome-item">
      <div className={outcomeColor[outcome.Value]}/>
      {outcome.FriendlyName}
    </div>
  );
}
