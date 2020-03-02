import React from "react";
import { MatchLineups } from "../../../../apis/soccer/models";
import PlayerRow from '../player-row';

type Props = {
    matchLineups: MatchLineups;
};

const render = (no: number, matchLineups: MatchLineups) => {
    const result: JSX.Element[] = [];

    for (let i = 0; i < no; i++) {
        result.push(
            <div className="mobile-lineups-row" key={i}>
                {matchLineups.Home.Substitutions[i] && <div className="home-sub"><PlayerRow
                    player={matchLineups.Home.Substitutions[i]}
                    isMainPlayer={false} /></div>}
                {matchLineups.Away.Substitutions[i] && <div className="away-sub"><PlayerRow
                    player={matchLineups.Away.Substitutions[i]}
                    isMainPlayer={false} /></div>}
            </div>);
    }

    return result;
};

const MobileSubstitutePlayers: React.FC<Props> = (props: Props) => {
    const maxNumberOfPlayers = props.matchLineups.Away.Substitutions?.length > props.matchLineups.Home.Substitutions?.length ?
        props.matchLineups.Away.Substitutions?.length :
        props.matchLineups.Home.Substitutions?.length;

    return (
        <div>
            {render(maxNumberOfPlayers, props.matchLineups)}
        </div>
    );
};

export default MobileSubstitutePlayers;