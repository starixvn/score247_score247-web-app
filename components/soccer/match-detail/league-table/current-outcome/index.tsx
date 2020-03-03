import "./style.scss";
import React from "react";
import { TeamOutcome } from "../../../../../apis/soccer/models";
import outcomeColor from "../../../../../common/enums/outcome-color";

type Props = {
  outcomes: TeamOutcome[];
};

export default function TeamOutcomes(props: Props) {
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

function Outcome(outcome: TeamOutcome) {
  return (
    <div>
      <i className="outcome" style={{backgroundColor: outcomeColor[outcome.Value]}}/>
      {outcome.FriendlyName}
    </div>
  );
}
