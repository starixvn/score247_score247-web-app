import React from "react";
import { TimelineEvent } from "../../../../apis/soccer/models";
import TimeCell from './time-cell';
import PlayerCell from './player-cell';
import ScoreCell from './score-cell';
import { EventTypes } from '../../../../common/enums/event-type';

type Props = {
    event: TimelineEvent;
};

const EventRow: React.FC<Props> = props => {
    const { event } = props;

    return (
        <>
            <div className="event-row">
                <TimeCell event={event} />
                {event.IsHome && <PlayerCell event={event} />}
                {(event.Type.Value === EventTypes.SCORE_CHANGE.value || event.Type.Value === EventTypes.PENALTY_MISSED.value)
                    && <ScoreCell homeScore={event.HomeScore} awayScore={event.AwayScore} />}
                {!event.IsHome && <PlayerCell event={event} />}
            </div>
        </>
    );
};

export default EventRow;