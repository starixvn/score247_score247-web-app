import "./style.scss";
import React from "react";
import { MatchSummary } from "../../../../apis/soccer/models";
import TimeAndStatusCell from "../time-status-cell";
import FirstHalfScoreCell from "../first-half-score-cell";
import FinalScoreCell from "../final-score-cell";
import Checkbox from "../../../common/basic/checkbox";
import HomeTeamCell from "../home-team-cell";
import AwayTeamCell from "../away-team-cell";
import ExtraMatchInfoRow from "../extra-match-info-row";
import { PeriodType } from "../../../../common/enums/period-type";
import {
  DeviceContextConsumer,
  DeviceContext
} from "../../../../contexts/device-context";
import LeagueCell from "../league-cell";
import FavoriteCell from "../favorite-cell";
import { DeviceContextType } from "../../../../contexts/device-context-type";
import { MatchStatusType } from "../../../../common/enums/match-status-type";
import Router from "next/router";
import { covertToUTC } from '../../../../common/helpers/date-time-helper';

type Props = {
  match: MatchSummary;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

type State = {
  isSelected: boolean;
};

class SoccerRow extends React.Component<Props, State> {
  private readonly hasExtraInfoRowSpan = 2;
  static contextType = DeviceContext;

  constructor(props: Props) {
    super(props);

    this.state = {
      isSelected: this.props.isSelected
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    this.setState({ isSelected: nextProps.isSelected });
  }

  handleSelectedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onSelect(event.target.value);
    this.setState({ isSelected: event.target.checked });
    event.stopPropagation();
  };

  handleClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    event.preventDefault();
    const { isMobile } = this.context;

    if (isMobile) {
      Router.push("/soccer/[...id]", `/soccer/${this.props.match.Id}/${covertToUTC(new Date(this.props.match.EventDate[0]))}`);
    } else {
      window.open("/soccer/[...id]", `/soccer/${this.props.match.Id}/${this.props.match.EventDate}`);
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

    const renderSelectCell = ({ isMobile }: DeviceContextType) => {
      return isMobile ? null : (
        <td
          rowSpan={rowSpan}
          onClick={event => {
            event.stopPropagation();
          }}
        >
          <Checkbox
            id={match.Id}
            value={match.Id}
            checked={this.state.isSelected}
            onChange={this.handleSelectedChange}
          />
        </td>
      );
    };

    return (
      <>
        <tr
          className="match-row"
          onClick={this.handleClick}
          data-match-id={match.Id}
        >
          <DeviceContextConsumer>{renderSelectCell}</DeviceContextConsumer>
          <LeagueCell rowSpan={rowSpan} match={match} />
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
          <FirstHalfScoreCell
            rowSpan={rowSpan}
            firstHalfPeriod={firstHalfPeriod}
          />
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
