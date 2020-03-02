import React from "react";
import { MatchLineups } from "../../../../apis/soccer/models";
import PlayerRow from '../player-row';

type Props = {
    matchLineups: MatchLineups;
};

const render = (matchLineups: MatchLineups) => {
    const result: JSX.Element[] = [];
    const numberOfPlayers = 11;

    for (let i = 0; i < numberOfPlayers; i++) {
        result.push(
            <div className="mobile-lineups-row" key={i}>
                <div className="home-sub"><PlayerRow
                    player={matchLineups.Home.Players[i]}
                    isMainPlayer={false} /></div>
                <div className="away-sub"><PlayerRow
                    player={matchLineups.Away.Players[i]}
                    isMainPlayer={false} /></div>
            </div>);
    }

    return result;
};

const MobileStartingLineups: React.FC<Props> = (props: Props) => {
    return (
        <div>
            {render(props.matchLineups)}
        </div>
    );
};

export default MobileStartingLineups;