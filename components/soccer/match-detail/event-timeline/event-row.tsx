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
            case EventTypes.SCORE_CHANGE_BY_OWN_GOAL.value:
                return ScoreChangeEventRow(event);
            case EventTypes.SUBSTITUTION.value:
                return SubstitutionEventRow(event);
            case EventTypes.RED_CARD.value:
            case EventTypes.YELLOW_CARD.value:
            case EventTypes.YELLOW_RED_CARD.value:
                return CardEventRow(event);
            case EventTypes.PENALTY_MISSED.value:
            case EventTypes.SCORE_CHANGE_BY_PENALTY.value:
                return PenaltyEventRow(event);
        }
    };

    return (
        <div className="event-row">{renderEventRow(props.event)}</div>
    );
};

export default EventRow;

const ScoreChangeEventRow = (event: TimelineEvent) => {
    const goalScorer = event.GoalScorer.Method === SoccerGoalMethod.OWN_GOAL
        ? <span className="own-scorer">{event.GoalScorer.Name}</span>
        : (
            <>
                <span className="goal-scorer">{event.GoalScorer.Name}</span>
                {event.Assist && <span className="goal-assist">{event.Assist.Name}</span>}
            </>
        )

    return (
        <div className="score-change">
            {goalScorer}
        </div>
    );
};

const SubstitutionEventRow = (event: TimelineEvent) =>
    <div>
        <span className="player-in">{event.PlayerIn.Name}</span>
        <span className="player-out">{event.PlayerOut.Name}</span>
    </div>;

const PenaltyEventRow = (event: TimelineEvent) =>
    <div>
        {
            event.Type.Value === EventTypes.PENALTY_MISSED.value ?
                <span className="">{event.Player.Name}</span> :
                <span className="">{event.GoalScorer.Name}</span>
        }
    </div>;

const CardEventRow = (event: TimelineEvent) =>
    <div>
        {
            event.Type.Value === EventTypes.YELLOW_CARD.value ?
                <span className="yellow-card">{event.Player.Name}</span> :
                event.Type.Value === EventTypes.RED_CARD.value ?
                    <span className="red-card">{event.Player.Name}</span> :
                    <span className="yellowred-card">{event.Player.Name}</span>

        }
    </div>;