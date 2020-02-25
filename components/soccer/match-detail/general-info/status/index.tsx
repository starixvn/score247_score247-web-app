import React from "react";
import { Props } from "./type";
import { buildMatchStatus } from "../../../../../common/helpers/match-status-helper";
import { DeviceContextConsumer } from "../../../../../contexts/device-context";
import { formatDate } from "../../../../../common/helpers/date-time-helper";
import { DateTimeFormat } from "../../../../../common/constants";
import { MatchStatusHelper } from "../../../../../common/enums/match-status-type";
import { DeviceContextType } from "../../../../../contexts/device-context-type";

class Status extends React.Component<Props> {
  intervalId = 0;
  intervalTime = 15000;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.intervalId = window.setInterval(
      () => this.forceUpdate(),
      this.intervalTime
    );
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
  }

  renderStatus = ({ isMobile }: DeviceContextType) => {
    const { match } = this.props;
    const status = buildMatchStatus(match);

    return (
      <div className="status-section">
        {isMobile && (
          <div>
            {formatDate(new Date(match.EventDate[0]), DateTimeFormat.TIME)}
          </div>
        )}
        <div className="status">
          {!isMobile && MatchStatusHelper.isLiveMatch(match.EventStatus) && (
            <span className="icon-clock"></span>
          )}
          {status}
        </div>
      </div>
    );
  };

  render() {
    return <DeviceContextConsumer>{this.renderStatus}</DeviceContextConsumer>;
  }
}

export default Status;
