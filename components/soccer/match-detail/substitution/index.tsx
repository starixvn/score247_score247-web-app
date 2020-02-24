import React from "react";
import { TimelineEvent } from "../../../../apis/soccer/models";
import { sortArray } from "../../../../common/utils/sort";
import SubstitutionRow from './substitution-row';

type Props = {
  substitutionEvents: TimelineEvent[];
};

const Substitution: React.FC<Props> = (props: Props) => {
  const sortedSubstitutionEvents = props.substitutionEvents ? sortArray(props.substitutionEvents, "MatchTime", "DESC") : props.substitutionEvents;

  return (
    <div>
      {sortedSubstitutionEvents?.map(event => <SubstitutionRow substitutionEvent={event} key={event.Id} />)}
    </div>
  );
};

export default Substitution;