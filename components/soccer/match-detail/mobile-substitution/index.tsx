import React from "react";
import { MatchLineups } from "../../../../apis/soccer/models";
import SubstitutionRow from './../substitution/substitution-row';

type Props = {
    matchLineups: MatchLineups;
};

const render = (no: number, substitutionEvents: MatchLineups) => {
    const result: JSX.Element[] = [];

    for (let i = 0; i < no; i++) {
        result.push(
            <div className="mobile-lineups-row" key={i}>
                {substitutionEvents.Home.SubstitutionEvents[i] && <div className="home-sub"><SubstitutionRow
                    substitutionEvent={substitutionEvents.Home.SubstitutionEvents[i]}
                    key={substitutionEvents.Home.SubstitutionEvents[i].Id} /></div>}
                {substitutionEvents.Away.SubstitutionEvents[i] && <div className="away-sub"><SubstitutionRow
                    substitutionEvent={substitutionEvents.Away.SubstitutionEvents[i]}
                    key={substitutionEvents.Away.SubstitutionEvents[i].Id} /></div>}
            </div>);
    }

    return result;
};

const MobileSubstitution: React.FC<Props> = (props: Props) => {
    const maxNumberOfEvents = props.matchLineups.Away.SubstitutionEvents?.length > props.matchLineups.Home.SubstitutionEvents?.length ?
        props.matchLineups.Away.SubstitutionEvents?.length :
        props.matchLineups.Home.SubstitutionEvents?.length;

    return (
        <div>
            {render(maxNumberOfEvents, props.matchLineups)}
        </div>
    );
};

export default MobileSubstitution;