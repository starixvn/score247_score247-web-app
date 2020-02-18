import React, { useState, useEffect } from "react";
import { Props } from "./type";
import { buildMatchStatus } from "../../../../../common/helpers/match-status-helper";
import { useDeviceContext } from "../../../../../contexts/device-context";
import { formatDate } from "../../../../../common/helpers/date-time-helper";
import { DateTimeFormat } from "../../../../../common/constants";
import { MatchStatusHelper } from "../../../../../common/enums/match-status-type";

const Status: React.FC<Props> = props => {
  const { match } = props;
  const { isMobile } = useDeviceContext();
  const [status, setStatus] = useState<string>(buildMatchStatus(match));
  const intervalTime = 15000;
  
  useEffect(() => {
    setStatus(buildMatchStatus(match));
    const intervalId = window.setInterval(
      () => setStatus(buildMatchStatus(match)),
      intervalTime
    );

    return () => window.clearInterval(intervalId);
  });

  return (
    <div className="status-section">
      {isMobile && (
        <div>
          {formatDate(new Date(match.EventDate[0]), DateTimeFormat.TIME)}
        </div>
      )}
      <div className="status">
        {!isMobile && MatchStatusHelper.isLiveMatch(match.EventStatus) && <span className="icon-clock"></span>}
        {status}</div>
    </div>
  );
};

export default Status;
