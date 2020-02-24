import React from "react";
import { DeviceContext } from "../../../../contexts/device-context";
import { Props } from "./type";
import { MatchStatusType, PreMatchStatuses } from "../../../../common/enums/match-status-type";
import { MatchPeriod } from "../../../../apis/soccer/models";

function isPreMatch(eventStatusId?: number): boolean {
  return (
    eventStatusId === undefined ||
    PreMatchStatuses.some(x => x === eventStatusId)
  );
}

function renderFirstHalfScore(
  isMobile: boolean,
  firstHalfPeriod?: MatchPeriod,
  matchStatusId?: number
) {
  const matchStatusesToNotShow = [
    ...PreMatchStatuses,
    MatchStatusType.FIRST_HALF.value
  ];

  if (isMobile && firstHalfPeriod && !matchStatusesToNotShow.some(x => x === matchStatusId)) {
    return (
      <div className="text-1H">
        ({firstHalfPeriod.HomeScore} - {firstHalfPeriod.AwayScore})
      </div>
    );
  }

  return null;
}

export default function FinalScoreCell(props: Props) {
  const { firstHalfPeriod, homeScore, awayScore, matchStatusId, eventStatusId } = props;
  const { isMobile } = React.useContext(DeviceContext);
  const displayScore = isPreMatch(eventStatusId)
    ? "-"
    : `${homeScore} - ${awayScore}`;

  return (
    <td className="text-score">
      {displayScore}
      {renderFirstHalfScore(isMobile, firstHalfPeriod, matchStatusId)}
    </td>
  );
}
