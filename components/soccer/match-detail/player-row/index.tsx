import "./style.scss";
import React from "react";
import { Player } from "../../../../apis/soccer/models";
import { EventTypes } from "../../../../common/enums/event-type";

type Props = {
    player: Player;
    displayScore?: boolean;
    isMainPlayer?: boolean;
};

const PlayerRow: React.FC<Props> = ({ player, displayScore = true, isMainPlayer = true }) => {
    const hasSubstitution = player.EventStatisticFormatted && player.EventStatisticFormatted[EventTypes.SUBSTITUTION.value];

    const renderGoals = () => {
        if (!player.EventStatisticFormatted) {
            return null;
        }

        const normalGoals = player.EventStatisticFormatted[EventTypes.SCORE_CHANGE.value];
        const penGoals = player.EventStatisticFormatted[EventTypes.SCORE_CHANGE_BY_PENALTY.value];
        const ownGoals = player.EventStatisticFormatted[EventTypes.SCORE_CHANGE_BY_OWN_GOAL.value];
        const hasGoals = normalGoals || penGoals || ownGoals;

        if (hasGoals) {
            let totalGoals = normalGoals ?? 0;
            if (penGoals) {
                totalGoals += penGoals;
            }

            return (
                <>
                    <span className="icon-goal">Goal: {totalGoals}</span>
                    {ownGoals && <span className="icon-own-goal">Own Goal: {ownGoals}</span>}
                </>
            );
        }

        return null;
    };

    return (
        <div className="player-row">
            <div className="event-statistic">
                {/* {displayScore && renderGoals()}
                {hasSubstitution && <span className={isMainPlayer ? "sub-out" : "sub-in"}></span>} */}
                <span className="icon-goal"></span><span className="icon-own-goal"></span><span className="icon-out"></span>
            </div>
            <div><span className="jersey">{player.JerseyNumber}. </span>{player.Name}</div>
        </div>
    );
};

export default PlayerRow;