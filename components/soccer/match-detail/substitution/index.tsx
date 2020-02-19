import React from "react";
import { TimelineEvent } from "../../../../apis/soccer/models";
import { sortArray } from "../../../../common/utils/sort";
import PlayerRow from '../player-row';
import { EventTypes } from "../../../../common/enums/event-type";

type Props = {
  substitutionEvents: TimelineEvent[];
};

const BuildMatchTime = (timelineEvent: TimelineEvent) =>
  !timelineEvent.StoppageTime
    ? `${timelineEvent.MatchTime}'`
    : `${timelineEvent.MatchTime}'+${timelineEvent.StoppageTime}'`;

const SubstitutionRow = (substitutionEvent: TimelineEvent) => {
  const eventStatisticFormatted = { [EventTypes.SUBSTITUTION.value]: 1 };
  substitutionEvent.PlayerIn.EventStatisticFormatted = substitutionEvent.PlayerIn.EventStatisticFormatted ?? eventStatisticFormatted;
  substitutionEvent.PlayerOut.EventStatisticFormatted = substitutionEvent.PlayerOut.EventStatisticFormatted ?? eventStatisticFormatted;

  return (
    <div className="subtitution-item" key={substitutionEvent.Id}>      
      <div className="time">{BuildMatchTime(substitutionEvent)}</div>
      {PlayerRow({ player: substitutionEvent.PlayerIn, displayScore: false, isMainPlayer: true })}
      {PlayerRow({ player: substitutionEvent.PlayerOut, displayScore: false, isMainPlayer: false })}      
    </div>);
};

const Substitution: React.FC<Props> = (props: Props) => {
  const sortedSubstitutionEvents = props.substitutionEvents ? sortArray(props.substitutionEvents, "MatchTime", "DESC") : props.substitutionEvents;

  return (
    <>
      {sortedSubstitutionEvents?.map(event => SubstitutionRow(event))}
    </>
  );
};

export default Substitution;