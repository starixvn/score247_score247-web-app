import React from "react";
import lscache from "lscache";
import SoccerTable from "../table";
import { DisplayMode } from "../../../common/constants";
import { MatchEventSignalRMessage } from "../../../apis/soccer/models/signalr-messages";
import { MatchSummary } from "../../../apis/soccer/models/match-summary";
import { SoccerAPI } from "../../../apis/soccer/soccer-api";
import { sortArray } from "../../../common/utils/sort";
import { SoccerSortOptions } from "../../../common/enums/soccer-sort-option";
import { findIndex, uniqBy } from "lodash";
import SoccerFilterBar from "../filter-bar";
import { League } from "./type";
import { updateMatchFromEvent } from "../../../common/helpers/soccer-match-helper";
import { MatchStatusType } from '../../../common/enums/match-status-type';

type State = {
  filterText: string;
  displayMode: DisplayMode;
  matches: MatchSummary[];
  selectedDate: Date;
  sortByValue: number;
  selectedLeagues: string[];
  filteredMatchByLeagues: MatchSummary[];
  isShowingLiveMatches: boolean;
};

class FilterSoccerTable extends React.Component<{}, State> {
  private readonly cacheExpiryTimeInMinutes = 120;
  private readonly defaultSortProperty = "EventDate";
  private readonly liveMatchesFetchIntervalInMilliseconds = 60000;
  private readonly timeToRemoveEndedMatchesInMilliseconds = 10800000;
  displayMatches: MatchSummary[];
  soccerTableRef: React.RefObject<SoccerTable>;
  displayLeagues: League[];
  filteredAndSortedMatchByLeague: MatchSummary[];
  interval?: number;

  constructor(props: {}) {
    super(props);

    this.displayMatches = [];
    this.soccerTableRef = React.createRef<SoccerTable>();
    this.displayLeagues = [];
    this.filteredAndSortedMatchByLeague = [];

    this.state = {
      filterText: "",
      displayMode: DisplayMode.SHOW_ALL,
      matches: [],
      selectedDate: new Date(),
      sortByValue: SoccerSortOptions.KICK_OFF_TIME,
      selectedLeagues: [],
      filteredMatchByLeagues: [],
      isShowingLiveMatches: false
    };
  }

  async componentDidMount() {
    await this.handleDateChange(new Date());
  }

  componentDidUpdate() {
    if (this.state.isShowingLiveMatches) {
      this.interval = this.interval ?? window.setInterval(() => this.handleLiveButtonClick(), this.liveMatchesFetchIntervalInMilliseconds);
    } else {
      window.clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleDateChange = async (date: Date) => {
    const matches = await SoccerAPI.GetMatchesByDate(date);

    this.displayMatches = this.parseData(matches);
    this.displayLeagues = uniqBy(
      matches.map(match => ({
        name: match.LeagueName,
        id: match.LeagueId,
        abbreviation: match.LeagueAbbreviation
      })),
      "id"
    ).sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

    this.setState({
      matches: matches,
      displayMode: DisplayMode.SHOW_ALL,
      selectedDate: date,
      filterText: "",
      selectedLeagues: this.displayLeagues.map(match => match.id),
      filteredMatchByLeagues: matches,
      isShowingLiveMatches: false
    });
  };

  handleLiveButtonClick = async () => {
    const matches = await SoccerAPI.GetLiveMatches();
    const removedMatches = matches.filter(match => match.EventStatus.Value === MatchStatusType.CLOSED.value &&
      new Date().getTime() - (match.EventDate[0] as Date).getTime() > this.timeToRemoveEndedMatchesInMilliseconds);
    const filteredMatches = matches.filter(match => !removedMatches.includes(match));

    this.displayMatches = this.parseData(matches);
    this.displayLeagues = uniqBy(
      matches.map(match => ({
        name: match.LeagueName,
        id: match.LeagueId,
        abbreviation: match.LeagueAbbreviation
      })),
      "id"
    ).sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

    this.setState({
      matches: filteredMatches,
      displayMode: DisplayMode.SHOW_ALL,
      filterText: "",
      selectedLeagues: this.displayLeagues.map(match => match.id),
      filteredMatchByLeagues: matches,
      isShowingLiveMatches: true
    });
  };

  parseData(data: MatchSummary[]) {
    if (
      data &&
      data.length &&
      this.state.sortByValue === SoccerSortOptions.KICK_OFF_TIME
    ) {
      return sortArray(data, this.defaultSortProperty);
    }

    return data;
  }

  matchEventHandler = (message: MatchEventSignalRMessage) => {
    const matchEvent = message?.MatchEvent;
    const matchResult = message?.MatchEvent?.MatchResult;
    const timeline = message?.MatchEvent?.Timeline;

    if (matchEvent == null || timeline == null) {
      return;
    }

    const processedTimelineIds: string[] =
      lscache.get(matchEvent.MatchId) ?? [];
    if (processedTimelineIds.includes(timeline.Id)) {
      return;
    }

    processedTimelineIds.push(timeline.Id);
    lscache.set(
      matchEvent.MatchId,
      processedTimelineIds,
      this.cacheExpiryTimeInMinutes
    );

    let isChanged = false;
    const matches = this.state.matches.map(match => {
      if (match.Id === matchEvent.MatchId) {
        isChanged = true;
        updateMatchFromEvent(match, timeline, matchResult);
        const index = this.displayMatches.findIndex(
          displayMatch => displayMatch.Id === matchEvent.MatchId
        );
        this.displayMatches[index] = match;
      }

      return match;
    });

    if (isChanged) {
      this.setState({ matches: matches });
    }
  };

  handleDisplayModeChange = (mode: DisplayMode) => {
    this.displayMatches = this.filterMatches(mode);
    this.soccerTableRef.current?.resetSelectedIds();

    this.setState({
      displayMode: mode,
      filterText: mode === DisplayMode.SHOW_ALL ? "" : this.state.filterText,
      filteredMatchByLeagues: this.state.matches,
      selectedLeagues: mode === DisplayMode.SHOW_ALL ? this.displayLeagues.map(match => match.id) : this.state.selectedLeagues
    });
  };

  filterMatches = (mode: DisplayMode) => {
    if (mode === DisplayMode.SHOW_ALL) {
      return this.state.matches;
    } else {
      const selectedIds = this.soccerTableRef.current?.getSelectedIds();
      if (!selectedIds || selectedIds.length <= 0) {
        return this.displayMatches;
      }

      return this.displayMatches.filter(
        match =>
          (mode === DisplayMode.SHOW_ONLY &&
            selectedIds.indexOf(match.Id) >= 0) ||
          (mode === DisplayMode.HIDE && selectedIds.indexOf(match.Id) < 0)
      );
    }
  };

  handleFilterTextChange = (filterText: string) => {
    this.setState({ filterText: filterText });
  };

  handleSortChange = (sortValue: number) => {
    this.setState({ sortByValue: sortValue });
  };

  handleSubmitFilterLeagues = (selectedLeagues: string[]) => {
    this.displayMatches = this.state.matches.filter(
      match => selectedLeagues.indexOf(match.LeagueId) >= 0
    );
    this.setState({
      filteredMatchByLeagues: this.displayMatches,
      selectedLeagues: selectedLeagues
    });
  };

  handleResetFilterText = () => {
    this.setState({ filterText: "" });
  };

  render() {
    const { filterText, sortByValue } = this.state;
    let filteredMatches: MatchSummary[] = [];

    if (sortByValue === SoccerSortOptions.LEAGUE) {
      filteredMatches = this.state.filteredMatchByLeagues.filter(
        match => findIndex(this.displayMatches, match) >= 0
      );
    } else {
      filteredMatches = sortArray(
        this.displayMatches,
        this.defaultSortProperty
      );
    }

    filteredMatches = filteredMatches.filter(
      match =>
        match.HomeTeamName?.toLowerCase().search(filterText.toLowerCase()) !==
        -1 ||
        match.AwayTeamName?.toLowerCase().search(filterText.toLowerCase()) !==
        -1
    );

    return (
      <>
        <SoccerFilterBar
          onDisplayModeChange={this.handleDisplayModeChange}
          sortByValue={this.state.sortByValue}
          onSortChange={this.handleSortChange}
          filterText={this.state.filterText}
          onResetFilterText={this.handleResetFilterText}
          onFilterTextChange={this.handleFilterTextChange}
          leagues={this.displayLeagues}
          onSubmitFilterLeagues={this.handleSubmitFilterLeagues}
          selectedLeagues={this.state.selectedLeagues}
        />
        <SoccerTable
          matches={filteredMatches}
          ref={this.soccerTableRef}
          selectedDate={this.state.selectedDate}
        />
      </>
    );
  }
}

export default FilterSoccerTable;
