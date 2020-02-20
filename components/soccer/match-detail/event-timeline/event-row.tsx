import React from "react";
import { TimelineEvent } from "../../../../apis/soccer/models";
import { EventTypes } from "../../../../common/enums/event-type";
import { SoccerGoalMethod } from '../../../../common/enums/soccer-goal-method';

type Props = {
    event: TimelineEvent;
};

const EventRow: React.FC<Props> = props => {
    const renderEventRow = (event: TimelineEvent) => {
        switch (event.Type.Value) {
            case EventTypes.SCORE_CHANGE.value:
                return ScoreChangeEventRow(event);

            case EventTypes.SUBSTITUTION.value:
                return SubstitutionEventRow(event);

            case EventTypes.RED_CARD.value:
            case EventTypes.YELLOW_CARD.value:
            case EventTypes.YELLOW_RED_CARD.value:
                return CardEventRow(event);

            case EventTypes.PENALTY_MISSED.value:
                return PenaltyMissedEventRow(event);

            case EventTypes.BREAK_START.value:
            case EventTypes.MATCH_ENDED.value:
                return ScoreRow(event);
        }
    };

    return (
        <div className="event-row">{renderEventRow(props.event)}</div>
    );
};

export default EventRow;

const ScoreChangeEventRow = (event: TimelineEvent) => {
    const className = event.GoalScorer.Method === SoccerGoalMethod.OWN_GOAL ?
        "own-scorer" :
        event.GoalScorer.Method === SoccerGoalMethod.PENALTY ?
            "penalty-goal" :
            "goal-scorer";

    return (
        <div className="score-change">
            <>
                <span className={className}>{event.GoalScorer.Name}</span>
                {event.Assist && <span className="goal-assist">{event.Assist.Name}</span>}
            </>
        </div>
    );
};

const SubstitutionEventRow = (event: TimelineEvent) =>
    <div>
        <span className="player-in">{event.PlayerIn.Name}</span>
        <span className="player-out">{event.PlayerOut.Name}</span>
    </div>;

const PenaltyMissedEventRow = (event: TimelineEvent) =>
    <div>
        <span className="missed-penalty">{event.Player.Name}</span>
    </div>;

const CardEventRow = (event: TimelineEvent) => {
    const className = event.Type.Value === EventTypes.YELLOW_CARD.value ?
        "yellow-card" :
        event.Type.Value === EventTypes.RED_CARD.value ?
            "red-card" :
            "yellow-red-card";
    return (
        <div>
            <span className={className}></span><span>{event.Player.Name}</span>
        </div>
    );
};

const ScoreRow = (event: TimelineEvent) => {
    const className = event.Type.Value === EventTypes.BREAK_START.value ?
        "haft-time" :
        event.Type.Value === EventTypes.MATCH_ENDED.value ?
            "full-time" :
            "";

    return (
        <div>
            <span className={className}>Break</span>
        </div>
    );
};
