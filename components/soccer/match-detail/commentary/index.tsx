import "./style.scss";
import React from "react";
import { MatchCommentary } from "../../../../apis/soccer/models";
import CommentaryRow from "./commentary-row";
import { withTranslation } from "../../../../common/helpers/Localizer";
import { ResourceType, SoccerResourceKey } from "../../../../common/resources";
import Card from "../../../common/basic/card";
import { WithTranslation } from "react-i18next";
import { SoccerAPI } from "../../../../apis/soccer/soccer-api";
import { EventTypes } from "../../../../common/enums/event-type";

type Props = {
  matchId: string;
  date: Date;
} & WithTranslation;

type State = {
  comments: MatchCommentary[];
};

const specialEvents: number[] = [
  EventTypes.RED_CARD.value,
  EventTypes.YELLOW_CARD.value,
  EventTypes.YELLOW_RED_CARD.value,
  EventTypes.PENALTY_MISSED.value,
  EventTypes.SUBSTITUTION.value,
  EventTypes.VIDEO_ASSISTANT_REFEREE_OVER.value,
  EventTypes.SCORE_CHANGE.value
];

class Commentary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      comments: []
    };
  }

  async componentDidMount() {
    if (this.props.matchId) {
      const comments = await SoccerAPI.GetMatchCommentaries(
        this.props.matchId,
        new Date(this.props.date)
      );

      if (comments) {
        const filteredComments = comments.filter(
          comment =>
            (comment.Commentaries && comment.Commentaries.length > 0) ||
            specialEvents.includes(comment.TimelineType?.Value)
        );

        this.setState({ comments: filteredComments });
      }
    }
  }

  render() {
    const { t } = this.props;
    const compareFunc = (a: MatchCommentary, b: MatchCommentary) => {
      if (a.MatchTime === b.MatchTime) {
        const stoppageTimeA = parseInt(a.StoppageTime || "0");
        const stoppageTimeB = parseInt(b.StoppageTime || "0");

        if (stoppageTimeA === stoppageTimeB) {
          const eventTimeA = new Date(a.Time[0]).getTime();
          const eventTimeB = new Date(b.Time[0]).getTime();

          return eventTimeB - eventTimeA;
        }

        return stoppageTimeB - stoppageTimeA;
      }

      return b.MatchTime - a.MatchTime;
    };
    const comments = [...this.state.comments].sort(compareFunc);

    const commentaryBody = (
      <div className="commantaries">
        {comments.map(x => (
          <CommentaryRow comment={x} key={x.TimelineId} />
        ))}
      </div>
    );

    const commentary =
      this.state.comments.length > 0 ? (
        <Card
          title={t(SoccerResourceKey.COMMENTARY)}
          className="commentary"
          titleIcon={"icon-note"}
        >
          {commentaryBody}
        </Card>
      ) : null;

    return commentary;
  }
}

export default withTranslation(ResourceType.SOCCER)(Commentary);
