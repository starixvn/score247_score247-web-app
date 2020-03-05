import React from "react";
import { TimelineEvent } from '../../../../apis/soccer/models';
import { EventTypes } from '../../../../common/enums/event-type';
import PlayerRow from '../player-row';

type Props = {
    substitutionEvent: TimelineEvent
};

const BuildEventTime = (substitutionEvent: TimelineEvent) =>
    !substitutionEvent.StoppageTime
        ? `${substitutionEvent.MatchTime}'`
        : `${substitutionEvent.MatchTime}'+${substitutionEvent.StoppageTime}`;

const SubstitutionRow: React.FC<Props> = (props: Props) => {
    const eventStatisticFormatted = { [EventTypes.SUBSTITUTION.value]: 1 };
    if (props.substitutionEvent.PlayerIn) {
        props.substitutionEvent.PlayerIn.EventStatisticFormatted = props.substitutionEvent.PlayerIn.EventStatisticFormatted ?? eventStatisticFormatted;
    }
    if (props.substitutionEvent.PlayerOut) {
        props.substitutionEvent.PlayerOut.EventStatisticFormatted = props.substitutionEvent.PlayerOut.EventStatisticFormatted ?? eventStatisticFormatted;
    }

    return (
        <div className="substitution-item">
            <div className="time">{BuildEventTime(props.substitutionEvent)}</div>
            {props.substitutionEvent.PlayerOut && PlayerRow({ player: props.substitutionEvent.PlayerOut, displayScore: false, isMainPlayer: true })}
            {props.substitutionEvent.PlayerIn && PlayerRow({ player: props.substitutionEvent.PlayerIn, displayScore: false, isMainPlayer: false })}
        </div >);
};

export default SubstitutionRow;