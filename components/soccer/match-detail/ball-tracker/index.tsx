import "./style.scss";
import React from "react";
import SportRadarWidget from "../sportradar-widget";

type Props = {
  matchId: string;
};

type State = {
  isBallTrackerCollapsed: boolean;
};

class BallTracker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { isBallTrackerCollapsed: false };
  }

  render() {
    const collapseExpandClass = this.state.isBallTrackerCollapsed
      ? "collapse"
      : "expand";
    const ballTrackerHeader = (
      <div className="ball-tracker-header">        
        <span className="text"><span className="icon-tracker"></span>Ball Tracker</span>
        <span
          className={collapseExpandClass}
          onClick={() =>
            this.setState({
              isBallTrackerCollapsed: !this.state.isBallTrackerCollapsed
            })
          }
        >
          <span className="icon-arrow-down"></span>
        </span>
      </div>
    );
    const ballTrackerContent = (
      <div className={this.state.isBallTrackerCollapsed ? "display-none" : ""}>
        <SportRadarWidget matchId={this.props.matchId} widgetId="sr-widget-pitch" tabName="" disablePitch={false} />
      </div>
    );

    return (
      <div className="ball-tracker">
        {ballTrackerHeader}
        {ballTrackerContent}
      </div>
    );
  }
}

export default BallTracker;
