import React from "react";
import { TimelineEvent, MatchLineups } from "../../../../apis/soccer/models";
import { sortArray } from "../../../../common/utils/sort";
import SubstitutionRow from './../substitution/substitution-row';

type Props = {
    substitutionEvents: MatchLineups;
};

const render = (no: number, substitutionEvents: MatchLineups) => {
    for (let i = 0; i < no; i++) {
        <SubstitutionRow
            substitutionEvent={substitutionEvents.Away.SubstitutionEvents[i]}
            key={substitutionEvents.Away.SubstitutionEvents[i].Id} />
    }
};

const MobileSubstitution: React.FC<Props> = (props: Props) => {
    const maxNumberOfEvents = props.substitutionEvents.Away.SubstitutionEvents?.length > props.substitutionEvents.Home.SubstitutionEvents?.length ?
        props.substitutionEvents.Away.SubstitutionEvents?.length :
        props.substitutionEvents.Home.SubstitutionEvents?.length;

    return (
        <div>
            {/* {sortedSubstitutionEvents?.map(event => <SubstitutionRow substitutionEvent={event} key={event.Id} />)}
            {numberOfEmptyRow > 0 && Array.from(Array(numberOfEmptyRow).keys()).map(x => <div className="empty-substitution-item" key={x}></div>)} */}
        </div>
    );
};

export default MobileSubstitution;