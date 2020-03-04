import "./league-cell.scss";
import React from "react";
import { MatchSummary } from "../../../../apis/soccer/models";

const buildLeagueAbbreviation = (leagueName: string): string => {
  return leagueName
    .split(/[\s]/)
    .map(i => i.charAt(0))
    .join("");
};

const LeagueCell: React.FC<{ match: MatchSummary; rowSpan?: number }> = ({
  match,
  rowSpan
}) => {
  const league = match.IsInternationalLeague
    ? buildLeagueAbbreviation(match.LeagueName)
    : `${match.CountryCode} ${buildLeagueAbbreviation(match.LeagueName)}`;
  const leagueTitle = match.IsInternationalLeague
    ? match.LeagueName
    : `${match.CountryName} ${match.LeagueName}`;

  return (
    <td
      rowSpan={rowSpan}
      className={`league ${match.LeagueRegion}`}
      title={leagueTitle}
      onClick={event => {
        event.stopPropagation();
        // window.open(`/soccer/leagues/${match.LeagueId}`);
      }}
    >
      {league}
    </td>
  );
};

export default LeagueCell;
