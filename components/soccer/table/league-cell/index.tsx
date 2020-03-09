import "./league-cell.scss";
import React from "react";
import { MatchSummary } from "../../../../apis/soccer/models";
import Router from "next/router";
import { useDeviceContext } from '../../../../contexts/device-context';
import { EEXIST } from 'constants';

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
  const { isMobile } = useDeviceContext();

  const league = match.IsInternationalLeague
    ? buildLeagueAbbreviation(match.LeagueName)
    : `${match.CountryCode} ${buildLeagueAbbreviation(match.LeagueName)}`;
  const leagueTitle = match.IsInternationalLeague
    ? match.LeagueName
    : `${match.CountryName} ${match.LeagueName}`;
  const roundGroup = match.LeagueRoundGroup ? `&roundGroup=${match.LeagueRoundGroup}` : ``;
  const leagueId = `id=${match.LeagueId}`;
  const seasonId = `&seasonId=${match.LeagueSeasonId}`;
  const leagueGroupName = `&leagueGroupName=${match.LeagueGroupName}`;
  const countryCode = match.CountryCode ? `&countryCode=${match.CountryCode}` : ``;
  const url = `/soccer/leagues/details?${leagueId}${seasonId}${roundGroup}${leagueGroupName}${countryCode}`;
  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMobile) {
      Router.push(url);
    }
    else {
      window.open(url);
    }
  };
  return (
    <td
      rowSpan={rowSpan}
      className={`league ${match.LeagueRegion}`}
      title={leagueTitle}
      onClick={(e) => handleOnClick(e)}
    >
      {league}
    </td>
  );
};

export default LeagueCell;
