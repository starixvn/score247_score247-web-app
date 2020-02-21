import "./style.scss";
import React from "react";
import { MatchInfo } from "../../../../apis/soccer/models";
import { useTranslation } from "react-i18next";
import { ResourceType, SoccerResourceKey } from "../../../../common/resources";

type Props = {
    matchInfo: MatchInfo;
};

const OtherInfo: React.FC<Props> = (props) => {
    const { t } = useTranslation(ResourceType.SOCCER);
    const { Referee, Venue, Attendance } = props.matchInfo;

    return (
        <div className="other-info">
            {Referee && <div className="other-info-item"><span className="icon-referee"></span><span className="key">{t(SoccerResourceKey.REFEREE)}:</span> {Referee}</div>}
            {Venue?.Name && <div className="other-info-item"><span className="icon-venue"></span><span className="key">{t(SoccerResourceKey.VENUE)}:</span> {Venue.Name}</div>}
            {(Attendance ?? 0) > 0 &&
                (
                    <div className="other-info-item">
                        <span className="icon-spectator"></span>
                        <span className="key">{t(SoccerResourceKey.SPECTATORS)}:</span> {Attendance.toLocaleString()}
                    </div>
                )
            }
        </div>
    );
};

export default OtherInfo;