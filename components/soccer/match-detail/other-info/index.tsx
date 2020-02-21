import "./style.scss";
import React from "react";
import { MatchInfo } from "../../../../apis/soccer/models";

type Props = {
    matchInfo: MatchInfo;
};

const OtherInfo: React.FC<Props> = (props) => {
    const { Referee, Venue, Attendance } = props.matchInfo;

    return (
        <div className="other-info">
            <div className="other-info-item"><span className="icon-referee"></span><span className="key">Referee:</span> {Referee}</div>
            <div className="other-info-item"><span className="icon-venue"></span><span className="key">Venue:</span> {Venue.Name}</div>
            <div className="other-info-item"><span className="icon-spectator"></span><span className="key">Spectators:</span> {Attendance.toLocaleString()}</div>
        </div>
    );
};

export default OtherInfo;