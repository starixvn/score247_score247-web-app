
export const buildLeagueAbbreviation = (leagueName: string): string => {
    return leagueName
        .split(/[\s]/)
        .map(i => i.charAt(0))
        .join("");
};