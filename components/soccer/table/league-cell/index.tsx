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
  const roundGroup = match.LeagueRoundGroup ? `&groupName=${match.LeagueRoundGroup}` : ``;
  const leagueId = `id=${match.LeagueId}`;
  const seasonId = `&seasonId=${match.LeagueSeasonId}`;
  const leagueGroupName = `&leagueGroupName=${match.LeagueGroupName}`;
  const countryCode = match.CountryCode ? `&countryCode=${match.CountryCode}` : ``;

  return (
    <td
      rowSpan={rowSpan}
      className={`league ${match.LeagueRegion}`}
      title={leagueTitle}
      onClick={() => {
        if (isMobile) {
          Router.push({
            pathname: "/soccer/leagues/details",
            query: {
              id: match.LeagueId,
              seasonId: match.LeagueSeasonId,
              roundGroup: match.LeagueRoundGroup,
              leagueGroupName: match.LeagueGroupName,
              countryCode: match.CountryCode
            }
          });
        }
        else {
          window.open(`/soccer/leagues/details?${leagueId}${seasonId}${roundGroup}${leagueGroupName}${countryCode}`);
        }
      }}
    >
      {league}
    </td>
  );
};

export default LeagueCell;
