import "./league-cell.scss";
import React from "react";
import { MatchSummary } from "../../../../apis/soccer/models";
import Router from "next/router";
import { useDeviceContext } from '../../../../contexts/device-context';

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
  const { isMobile } = useDeviceContext();
  const roundGroup = match.LeagueRoundGroup ? `&roundGroup=${match.LeagueRoundGroup}` : ``;
  const groupName = match.LeagueGroupName ? `&groupName=${match.LeagueGroupName}` : ``;

  return (
    <td
      rowSpan={rowSpan}
      className={`league ${match.LeagueRegion}`}
      title={leagueTitle}
      onClick={() => {
        if (isMobile) {
          Router.push({ pathname: "/soccer/leagues/details", query: { 
            id: match.LeagueId,
            seasonId: match.LeagueSeasonId,
            roundGroup: match.LeagueRoundGroup,
            groupName: match.LeagueGroupName
          }});
        }
        else {
          window.open(`/soccer/leagues/details?id=${match.LeagueId}&seasonId=${match.LeagueSeasonId}${groupName}${roundGroup}`);
        }
      }}
    >
      {league}
    </td>
  );
};

export default LeagueCell;
