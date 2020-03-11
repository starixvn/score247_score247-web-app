import React from "react";
import Checkbox from '../../common/basic/checkbox';
import { League } from '../filter-table/type';
import { buildLeagueAbbreviation } from '../../../common/helpers/soccer-league-helper';

type Props = {
    isSelected: boolean;
    league: League;
    onSelect: (league: string) => void;
};

const LeagueRow: React.FunctionComponent<Props> = (props) => {
    const { league, isSelected } = props;
    return (
        <div className="league-row">
            <div className="league-row-name"><Checkbox id={league.id} checked={isSelected} value={league.id} onChange={() => props.onSelect(league.id)} />
                <span onClick={() => props.onSelect(league.id)}>{`${league.name} (${buildLeagueAbbreviation(league.name)})`}</span></div>
            <i className="icon-menu-favorites"></i>
        </div>
    );
};

export default LeagueRow;