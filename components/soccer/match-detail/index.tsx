import "./style.scss";
import React from "react";
import dynamic from "next/dynamic";
import { MatchInfo, MatchLineups, MatchCommentary } from "../../../apis/soccer/models";
import { SoccerAPI } from "../../../apis/soccer/soccer-api";
import { SoccerSignalRClient } from "../../../apis/soccer/soccer-signalr-client";
import appSettings from "../../../app-settings";
import { MatchEventSignalRMessage } from "../../../apis/soccer/models/signalr-messages";
import { DeviceContextConsumer } from "../../../contexts/device-context";
import { DeviceContextType } from "../../../contexts/device-context-type";
import { updateMatchFromEvent } from "../../../common/helpers/soccer-match-helper";
import { EventTypes } from '../../../common/enums/event-type';
import { i18n } from "../../../common/helpers/Localizer";

const MobileView = dynamic(() => import("./mobile-view"));
const DesktopView = dynamic(() => import("./desktop-view"));

type Props = {
  matchId: string | string[];
};

type State = {
  matchInfo: MatchInfo | null;
  matchLineUps: MatchLineups | null;
  matchCommentaries: MatchCommentary[] | null;
  soccerSignalRClient?: SoccerSignalRClient;
};

class SoccerMatchDetail extends React.Component<Props, State> {
  eventTypeToChangeLineUps: number[] = [
    EventTypes.RED_CARD.value,
    EventTypes.SCORE_CHANGE.value,
    EventTypes.SUBSTITUTION.value,
    EventTypes.YELLOW_CARD.value,
    EventTypes.YELLOW_RED_CARD.value,
    EventTypes.SCORE_CHANGE_BY_PENALTY.value,
    EventTypes.SCORE_CHANGE_BY_OWN_GOAL.value,
    EventTypes.MATCH_STARTED.value
  ];

  supportedLangues: { [key: string]: string } = {
    "en": "en",
    "vi": "vi",
    "id": "id",
    "th": "th",
    "zhTW": "zht",
    "zhCN": "zh"
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      matchInfo: null,
      matchLineUps: null,
      matchCommentaries: null
    };
  }

  async componentDidMount() {
    const matchInfo = await SoccerAPI.GetMatch(this.props.matchId);
    const matchLineUps = await SoccerAPI.GetMatchLineups(this.props.matchId, new Date(matchInfo.Match.EventDate[0]));
    const matchCommentaries = await SoccerAPI.GetMatchCommentaries(this.props.matchId, new Date(matchInfo.Match.EventDate[0]));

    if (!matchInfo.TimelineEvents) {
      matchInfo.TimelineEvents = [];
    }

    this.setupSignalClient();

    const script = document.createElement("script");
    script.async = true;
    script.innerHTML = `(function(a,b,c,d,e,f,g,h,i){a[e]||(i=a[e]=function(){(a[e].q=a[e].q||[]).push(arguments)},i.l=1*new Date,i.o=f,
        g=b.createElement(c),h=b.getElementsByTagName(c)[0],g.async=1,g.src=d,g.setAttribute("n",e),h.parentNode.insertBefore(g,h)
        )})(window,document,"script","https://widgets.sir.sportradar.com/${appSettings.sportRadarWidgetKey}/widgetloader","SIR", {
            language: '${this.supportedLangues[i18n.language]}'
        });`;

    document.body.appendChild(script);

    this.setState({ matchInfo, matchLineUps, matchCommentaries });
  }

  setupSignalClient() {
    const eventHandlers = {
      MatchEvent: this.matchEventHandler
    };

    const client = new SoccerSignalRClient(
      appSettings.soccerPublisherUrl,
      eventHandlers
    );

    this.setState(
      {
        soccerSignalRClient: client
      },
      () => client.start()
    );
  }

  matchEventHandler = (message: MatchEventSignalRMessage) => {
    const { matchInfo } = this.state;

    const matchEvent = message?.MatchEvent;

    if (
      matchEvent &&
      matchEvent.Timeline &&
      matchInfo?.Match.Id === matchEvent.MatchId
    ) {
      const matchResult = matchEvent.MatchResult;
      const timeline = matchEvent.Timeline;

      if (matchInfo.TimelineEvents.some(x => x.Id === timeline.Id)) {
        return;
      }

      matchInfo.TimelineEvents.push(timeline);

      updateMatchFromEvent(matchInfo.Match, timeline, matchResult);

      if (this.eventTypeToChangeLineUps.includes(matchEvent.Timeline.Type.Value)) {
        setTimeout(async () => {
          const matchLineUps = await SoccerAPI.GetMatchLineups(matchInfo.Match.Id, new Date(matchInfo.Match.EventDate[0]));
          this.setState({ matchInfo, matchLineUps });
        }, 5000); //NOSONAR

      } else {
        this.setState({ matchInfo });
      }
    }
  };

  renderMatchDetail = (value: DeviceContextType) => {
    if (this.state.matchInfo) {
      if (value.isMobile) {
        return <MobileView matchInfo={this.state.matchInfo} matchLineUps={this.state.matchLineUps} />;
      }
      return <DesktopView matchInfo={this.state.matchInfo} matchLineUps={this.state.matchLineUps} matchCommentaries={this.state.matchCommentaries} />;
    }

    return null;
  };

  render() {
    return (
      <div className="content match-detail">
        <DeviceContextConsumer>{this.renderMatchDetail}</DeviceContextConsumer>
      </div>
    );
  }
}

export default SoccerMatchDetail;
