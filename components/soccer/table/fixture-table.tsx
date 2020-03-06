import React, { Fragment } from "react";
import SoccerRow from "./fixture-row";
import Header from "./fixture-header";
import TitleRow from "./title-row/title-row";
import { MatchSummary } from "../../../apis/soccer/models/match-summary";
import appSettings from "../../../app-settings";
import { format } from "date-fns";
import { DateTimeFormat } from "../../../common/constants";
import AdvertisementRow from "./advertisement-row";
import advertisements from "../../../advertisement";
import "./style.scss";
import EmptyRow from "./empty-row";

export type Props = {
  fixtures: MatchSummary[];
  results: MatchSummary[];
};

export type State = {
  isShowAllResults: boolean;
}

type MatchGroupByDate = {
  [key: string] : MatchSummary[];
}

class FixtureTable extends React.Component<Props, State> {
  private renderedRow = 0;
  private displayedAdvertisements = advertisements.slice();

  constructor(props: Props) {
    super(props);

    this.state = {
      isShowAllResults: false
    }
  }

  changeShowAllResults(value: boolean) {
    this.setState({ isShowAllResults: value });
  }

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

  renderRow = (match: MatchSummary) => {
    this.renderedRow++;
    const renderAd = this.renderedRow % appSettings.numberOfRowEveryAd === 0;

    return (
      <Fragment key={match.Id}>
        <SoccerRow match={match} />
        {renderAd && this.renderAdvertisement()}
      </Fragment>
    );
  };

  renderGroup = (group: MatchGroupByDate) => {
    return (
      <>
        {Object.keys(group).map((key: string) => (
          <Fragment key={key}>
            {<TitleRow className="latest-title" title={key} key={key}/>}
            {group[key].map(this.renderRow)}
          </Fragment>
        ))}        
      </>
    );
  }

  groupMatchByDate(matches: MatchSummary[]) {
    return matches.reduce((result: MatchGroupByDate, match: MatchSummary) => {
      const date = new Date(match.EventDate[0]);
      const key = format(date, DateTimeFormat.WEEKDATE_AND_DATE).toUpperCase();

      if (result[key]) {
        result[key].push(match);
      } else {
        result[key] = [match];
      }

      return result;
    }, {});
  }

  renderBodyRows(fixtures: MatchSummary[], results: MatchSummary[]) {
    if ((this.state.isShowAllResults && results.length > 0) || fixtures.length > 0) {
      this.renderedRow = 0;
      this.displayedAdvertisements = advertisements.slice();
      const resultGroups = this.state.isShowAllResults ? this.groupMatchByDate(results) : {};
      const fixtureGroups = this.groupMatchByDate(fixtures);

      return (
        <>
          {this.renderGroup(resultGroups)}
          {this.renderGroup(fixtureGroups)}
        </>
      );
    }
    
    return <EmptyRow />;
  }

  render() {
    const { results, fixtures } = this.props;

    return (
      <table className="table score-page">
        <Header />
        <tbody>{this.renderBodyRows(fixtures, results)}</tbody>
      </table>
    );
  }
}

export default FixtureTable;
