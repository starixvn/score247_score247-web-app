import React from "react";
import { TimelineEvent } from "../../../../apis/soccer/models";
import { sortArray } from "../../../../common/utils/sort";
import SubstitutionRow from './substitution-row';

type Props = {
  substitutionEvents: TimelineEvent[];
  maxNumberOfSubstitutionEvent: number;
};

const Substitution: React.FC<Props> = (props: Props) => {
  const sortedSubstitutionEvents = props.substitutionEvents ? sortArray(props.substitutionEvents, "MatchTime", "DESC") : props.substitutionEvents;
  const numberOfEmptyRow = props.maxNumberOfSubstitutionEvent - sortedSubstitutionEvents.length;

  return (
    <div>
      {sortedSubstitutionEvents?.map(event => <SubstitutionRow substitutionEvent={event} key={event.Id} />)}
      {numberOfEmptyRow > 0 && Array.from(Array(numberOfEmptyRow).keys()).map(x => <div className="empty-substitution-item" key={x}></div>)}
    </div>
  );
};

export default Substitution;