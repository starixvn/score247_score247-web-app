import React from "react";
import { State, Props } from "./type";
import { SoccerAPI } from "../../../../apis/soccer/soccer-api";
import TeamStandings from "./team-standings";
import Notes from "./notes";
import TeamOutcomes from "./current-outcome";

export default class LeagueTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      leagueTable: null
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const leagueTable = await SoccerAPI.GetLeagueTable(
      match.LeagueId,
      match.LeagueSeasonId,
      match.GroupName || match.LeagueGroupName
    );

    this.setState({ leagueTable });
  }

  render() {
    const { leagueTable } = this.state;

    if (leagueTable && leagueTable.GroupTables?.some(x => x)) {
        const groupTable = leagueTable.GroupTables[0];
      return (
        <>
          <TeamStandings
            teamStandings={groupTable.TeamStandings}
          />
          <Notes notes={groupTable.GroupNotes} />
          <TeamOutcomes outcomes={groupTable.OutcomeList} />
        </>
      );
    }

    return null;
  }
}
