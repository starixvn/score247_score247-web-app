import React from "react";
import { MatchInfo } from "../../../../apis/soccer/models";

type Props = {
    matchInfo: MatchInfo;
};

const OtherInfo: React.FC<Props> = (props) => {
    const { Referee, Venue, Attendance } = props.matchInfo;

    return (
        <div className="match-info">
            <div><span>Referee:</span> {Referee}</div>
            <div><span>Venue:</span> {Venue.Name}</div>
            <div><span>Spectators:</span> {Attendance.toLocaleString()}</div>
        </div>
    );
};

export default OtherInfo;