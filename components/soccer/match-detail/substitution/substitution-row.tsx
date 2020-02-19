import React from "react";
import { TimelineEvent } from '../../../../apis/soccer/models';
import { EventTypes } from '../../../../common/enums/event-type';
import PlayerRow from '../player-row';

type Props = {
    substitutionEvent: TimelineEvent
};

const BuildMatchTime = (timelineEvent: TimelineEvent) =>
    !timelineEvent.StoppageTime
        ? `${timelineEvent.MatchTime}'`
        : `${timelineEvent.MatchTime}'+${timelineEvent.StoppageTime}'`;


const SubstitutionRow: React.FC<Props> = (props: Props) => {
    const eventStatisticFormatted = { [EventTypes.SUBSTITUTION.value]: 1 };
    props.substitutionEvent.PlayerIn.EventStatisticFormatted = props.substitutionEvent.PlayerIn.EventStatisticFormatted ?? eventStatisticFormatted;
    props.substitutionEvent.PlayerOut.EventStatisticFormatted = props.substitutionEvent.PlayerOut.EventStatisticFormatted ?? eventStatisticFormatted;

    return (
        <div className="subtitution-item">
            <div className="time">{BuildMatchTime(props.substitutionEvent)}</div>
            {PlayerRow({ player: props.substitutionEvent.PlayerIn, displayScore: false, isMainPlayer: false })}
            {PlayerRow({ player: props.substitutionEvent.PlayerOut, displayScore: false, isMainPlayer: true })}
        </div>);
};

export default SubstitutionRow;