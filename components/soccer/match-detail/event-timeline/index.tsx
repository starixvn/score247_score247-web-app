import React from "react";
import { TimelineEvent } from "../../../../apis/soccer/models";
import EventRow from "./event-row";

type Props = {
    events: TimelineEvent[];
};

const EventTimeline: React.FC<Props> = props => {
    const { events } = props;
    const sortedEvents = events.sort((A, B) => {
        const compareMatchTime = A.MatchTime < B.MatchTime ? 1 : A.MatchTime > B.MatchTime ? -1 : 0;
        const compareStoppageTime = A.StoppageTime < B.StoppageTime ? 1 : A.StoppageTime > B.StoppageTime ? -1 : 0;
        const compareTime = A.Time < B.Time ? 1 : A.Time > B.Time ? -1 : 0;

        return compareMatchTime || compareStoppageTime || compareTime;
    });

    return (
        <div className="event-timeline">
            {sortedEvents.map(event => <EventRow key={event.Id} event={event} />)}
        </div>
    );
};

export default EventTimeline;