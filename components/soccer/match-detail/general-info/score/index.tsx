import React from "react";
import { Props } from "./type";
import { PeriodType } from "../../../../../common/enums/period-type";
import {
  MatchStatusType,
  PreMatchStatuses
} from "../../../../../common/enums/match-status-type";
import { MatchSummary } from "../../../../../apis/soccer/models";
import Status from "../status";
import { useDeviceContext } from "../../../../../contexts/device-context";

function isPreMatch(eventStatusId?: number): boolean {
  return !eventStatusId || PreMatchStatuses.some(x => x === eventStatusId);
}

function renderFirstHalfScore(match: MatchSummary) {
  const matchStatusesToNotShow = [
    ...PreMatchStatuses,
    MatchStatusType.FIRST_HALF.value
  ];

  const firstHalfPeriod =
    match.MatchPeriods &&
    match.MatchPeriods.find(
      x => x.Number === 1 && x.PeriodType.Value === PeriodType.Regular
    );

  if (
    firstHalfPeriod &&
    !matchStatusesToNotShow.some(x => x === match.MatchStatus?.Value)
  ) {
    return (
      <div className="half-score">
        ({firstHalfPeriod.HomeScore} - {firstHalfPeriod.AwayScore})
      </div>
    );
  }

  return null;
}

const Score: React.FC<Props> = props => {
  const { match } = props;
  const eventStatusId = match.EventStatus?.Value;
  const renderScore = !isPreMatch(eventStatusId);
  const { isMobile } = useDeviceContext();

  return (
    <div className="score">
      <div className="full-score">
        <div className="home-score">{renderScore && match.HomeScore}</div>
        {isMobile ? <div>-</div> : <Status match={match} />}
        <div className="away-score">{renderScore && match.AwayScore}</div>
      </div>
      {renderFirstHalfScore(match)}
    </div>
  );
};

export default Score;
