import React, { Fragment } from "react";
import SoccerRow from "./row";
import Header from "./header/header";
import TitleRow from "./title-row/title-row";
import { MatchSummary } from "../../../apis/soccer/models/match-summary";
import { EndStatus, CancelStatus } from "../../../common/enums/match-status-type";
import appSettings from "../../../app-settings";
import { format, isSameDay } from "date-fns";
import { DateTimeFormat } from "../../../common/constants";
import AdvertisementRow from "./advertisement-row";
import advertisements from "../../../advertisement";
import "./style.scss";
import EmptyRow from "./empty-row";

export type Props = {
  matches: MatchSummary[];
  selectedDate: Date;
};

class SoccerTable extends React.Component<Props> {
  private readonly today: Date;
  private selectedIds: string[];
  private renderedRow = 0;
  private displayedAdvertisements = advertisements.slice();

  constructor(props: Props) {
    super(props);

    this.today = new Date();
    this.selectedIds = [];
  }

  handleSelectRow = (id: string) => {
    const index = this.selectedIds.indexOf(id);

    if (index >= 0) {
      this.selectedIds = [
        ...this.selectedIds.slice(0, index),
        ...this.selectedIds.slice(index + 1)
      ];
    } else {
      this.selectedIds.push(id);
    }
  };

  getSelectedIds = () => (this.selectedIds);

  resetSelectedIds = () => {
    this.selectedIds = [];
  };

  renderAdvertisement = () => {
    if (this.displayedAdvertisements.length === 0) {
      this.displayedAdvertisements = advertisements.slice();
    }

    const advertisement = this.displayedAdvertisements[0];
    this.displayedAdvertisements.shift();

    return (
      <AdvertisementRow href={advertisement.href} imageSrc={advertisement.imageSrc} />
    );
  };

  renderRow = (match: MatchSummary, index: number) => {
    this.renderedRow++;
    const renderAd = this.renderedRow % appSettings.numberOfRowEveryAd === 0;

    return (
      <Fragment key={match.Id}>
        <SoccerRow match={match} isSelected={this.selectedIds.indexOf(match.Id) >= 0} onSelect={this.handleSelectRow} />
        {renderAd && this.renderAdvertisement()}
      </Fragment>
    );
  };

  handleFilterTextChange = (filterText: string) => {
    this.setState({ filterText: filterText });
  };

  isCancelMatch(match: MatchSummary) {
    return CancelStatus.includes(match.MatchStatus?.Value);
  }

  isEndMatch(match: MatchSummary) {
    return EndStatus.includes(match.MatchStatus?.Value);
  }

  classifyMatchRowsByStatus(matches: MatchSummary[]) {
    const cancelMatchRows: MatchSummary[] = [];
    const endMatchRows: MatchSummary[] = [];
    const preMatchRows: MatchSummary[] = [];

    matches.forEach((match, index: number) => {
      if (this.isCancelMatch(match)) {
        cancelMatchRows.push(match);
      } else if (this.isEndMatch(match)) {
        endMatchRows.push(match);
      } else {
        preMatchRows.push(match);
      }
    });

    return {
      preMatchRows: preMatchRows,
      endMatchRows: endMatchRows,
      cancelMatchRows: cancelMatchRows
    };
  }

  renderBodyRows(matches: MatchSummary[]) {
    const { selectedDate } = this.props;
    const classifiedRows = this.classifyMatchRowsByStatus(matches);
    this.renderedRow = 0;
    this.displayedAdvertisements = advertisements.slice();

    return (
      <>
        {classifiedRows.preMatchRows.map(this.renderRow)}
        {isSameDay(selectedDate, this.today)
          && classifiedRows.endMatchRows.length > 0
          && (<TitleRow className="latest-title" title={`Last Results (${format(this.props.selectedDate, DateTimeFormat.WEEKDATE_AND_DATE).toUpperCase()})`} />)}
        {classifiedRows.endMatchRows.map(this.renderRow)}
        {classifiedRows.cancelMatchRows.length > 0 && (<TitleRow className="cancel-title" title="Cancelled/postponed/abandoned/delayed/interrupted matches" />)}
        {classifiedRows.cancelMatchRows.map(this.renderRow)}
      </>
    );
  }

  render() {
    const { matches } = this.props;
    const bodyRows = matches && matches.length > 0 ? this.renderBodyRows(matches) : <EmptyRow />;
    return (
      <table className="table score-page">
        <Header />
        <tbody>{bodyRows}</tbody>
      </table>
    );
  }
}

export default SoccerTable;
