import "../row/style.scss";
import React from "react";
import { MatchSummary } from "../../../../apis/soccer/models";
import TimeAndStatusCell from "../time-status-cell";
import FinalScoreCell from "../final-score-cell";
import HomeTeamCell from "../home-team-cell";
import AwayTeamCell from "../away-team-cell";
import ExtraMatchInfoRow from "../extra-match-info-row";
import { PeriodType } from "../../../../common/enums/period-type";
import { DeviceContext } from "../../../../contexts/device-context";
import FavoriteCell from "../favorite-cell";
import { MatchStatusType } from "../../../../common/enums/match-status-type";
import Router from "next/router";

type Props = {
  match: MatchSummary;
};

class SoccerRow extends React.Component<Props> {
  private readonly hasExtraInfoRowSpan = 0;
  static contextType = DeviceContext;

  handleClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    event.preventDefault();
    const { isMobile } = this.context;

    if (isMobile) {
      Router.push("/soccer/[id]", `/soccer/${this.props.match.Id}`);
    } else {
      window.open(`/soccer/${this.props.match.Id}`);
    }
  };

  createTeamCellProps = () => {
    const { match } = this.props;
    const penaltyPeriod =
      match.MatchPeriods &&
      match.MatchPeriods.find(x => x.PeriodType.Value === PeriodType.Penalties);

    const { EventStatus } = match;

    return {
      homeTeamCellProps: {
        homeTeamName: match.HomeTeamName,
        redCards: match.HomeRedCards + match.HomeYellowRedCards,
        yellowCards: match.HomeYellowCards,
        isAggregateWinner: match.HomeTeamId === match.AggregateWinnerId,
        isPenaltyWinner:
          penaltyPeriod && penaltyPeriod.HomeScore > penaltyPeriod.AwayScore,
        eventStatusId: EventStatus.Value
      },
      awayTeamCellProps: {
        awayTeamName: match.AwayTeamName,
        redCards: match.AwayRedCards + match.AwayYellowRedCards,
        yellowCards: match.AwayYellowCards,
        isAggregateWinner: match.AwayTeamId === match.AggregateWinnerId,
        isPenaltyWinner:
          penaltyPeriod && penaltyPeriod.HomeScore < penaltyPeriod.AwayScore,
        eventStatusId: EventStatus.Value
      }
    };
  };

  render() {
    const { match } = this.props;
    const firstHalfPeriod =
      match.MatchPeriods &&
      match.MatchPeriods.find(
        x => x.Number === 1 && x.PeriodType.Value === PeriodType.Regular
      );
    const { homeTeamCellProps, awayTeamCellProps } = this.createTeamCellProps();
    const hasAggregateScore =
      match.AggregateWinnerId &&
      match.EventStatus.Value === MatchStatusType.CLOSED.value;
    const isShowExtraInfoRow =
      hasAggregateScore ||
      match.MatchPeriods?.some(
        period =>
          period.PeriodType.Value === PeriodType.Overtime ||
          period.PeriodType.Value === PeriodType.Penalties
      );
    const rowSpan = isShowExtraInfoRow ? this.hasExtraInfoRowSpan : undefined;

    return (
      <>
        <tr
          className="match-row"
          onClick={this.handleClick}
          data-match-id={match.Id}
        >
          <TimeAndStatusCell rowSpan={rowSpan} match={match} />
          <HomeTeamCell {...homeTeamCellProps} />
          <FinalScoreCell
            homeScore={match.HomeScore}
            awayScore={match.AwayScore}
            firstHalfPeriod={firstHalfPeriod}
            matchStatusId={match.MatchStatus?.Value}
            eventStatusId={match.EventStatus?.Value}
          />
          <AwayTeamCell {...awayTeamCellProps} />
          <FavoriteCell rowSpan={rowSpan} />
        </tr>
        {isShowExtraInfoRow && (
          <ExtraMatchInfoRow match={match} onClick={this.handleClick} />
        )}
      </>
    );
  }
}

export default SoccerRow;
