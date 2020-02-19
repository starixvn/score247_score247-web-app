import React from "react";
import { TimelineEvent } from "../../../../apis/soccer/models";
import { EventTypes } from "../../../../common/enums/event-type";

type Props = {
    event: TimelineEvent;
};

const EventRow: React.FC<Props> = props => {
    const renderEventRow = (event: TimelineEvent) => {
        switch (event.Type.Value) {
            case EventTypes.SCORE_CHANGE.value:
                return <ScoreChangeEventRow event={event} />;
            case EventTypes.SUBSTITUTION.value:
                return <SubstitutionEventRow event={event} />;
        }
    };

    return (
        <div className="event-row">{renderEventRow(props.event)}</div>
    );
};

export default EventRow;

const ScoreChangeEventRow: React.FC<Props> = props => {

    return (
        <div></div>
    );
};

const SubstitutionEventRow: React.FC<Props> = props => {
    return (
        <div></div>
    );
};

const PenaltyShootOutEventRow: React.FC<Props> = props => {
    return (
        <div></div>
    );
};