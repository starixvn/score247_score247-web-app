import React from "react";
import { MatchCommentary } from "../../../../../apis/soccer/models";
import TimeCell from "../time-cell";
import CommentaryCell from "../commentary-cell";
import { EventTypes } from "../../../../../common/enums/event-type";
import { SoccerGoalMethod } from "../../../../../common/enums/soccer-goal-method";
import { useTranslation } from "../../../../../common/helpers/Localizer";
import { ResourceType } from "../../../../../common/resources";

type Props = {
  comment: MatchCommentary;
};

export type CommentaryType = {
  icon?: JSX.Element;
  message: string;
};

type SpecialEvent = {
  type: number;
  icon: JSX.Element;
  otherIcons?: {
    [key: string]: JSX.Element;
  };
};

const specialEvents: SpecialEvent[] = [
  {
    type: EventTypes.RED_CARD.value,
    icon: <span className="red-card" />
  },
  {
    type: EventTypes.YELLOW_CARD.value,
    icon: <span className="yellow-card" />
  },
  {
    type: EventTypes.YELLOW_RED_CARD.value,
    icon: (
      <div className="yellow-to-red">
        <span className="yellow-card" />
        <span className="red-card" />
      </div>
    )
  },
  {
    type: EventTypes.PENALTY_MISSED.value,
    icon: (
      <div className="miss-penalty">
        <img src="/static/images/miss-penalty.svg" />
      </div>
    )
  },
  {
    type: EventTypes.SUBSTITUTION.value,
    icon: (
      <div className="substitution">
        <span className="icon-arrow-down1" />
        <span className="icon-arrow-up" />
      </div>
    )
  },
  {
    type: EventTypes.VIDEO_ASSISTANT_REFEREE_OVER.value,
    icon: <span className="icon-var" />
  },
  {
    type: EventTypes.SCORE_CHANGE.value,
    icon: <span className="icon-goal" />,
    otherIcons: {
      [SoccerGoalMethod.OWN_GOAL]: <span className="icon-own-goal" />,
      [SoccerGoalMethod.PENALTY]: <span className="icon-goal-pen" />
    }
  }
];

const getIcon = (comment: MatchCommentary, specialEvent?: SpecialEvent) => {
  if (specialEvent && specialEvent.type === comment.TimelineType.Value) {
    if (specialEvent.otherIcons && comment.GoalScorer) {
      const method: string = comment.GoalScorer.Method;
      const otherIcon = specialEvent.otherIcons[method];

      if (otherIcon) {
        return otherIcon;
      }
    }
    return specialEvent.icon;
  }

  return undefined;
};

const getMessage = (
  comment: MatchCommentary,
  specialEvent?: SpecialEvent,
  t?: Function
) => {
  let content = comment.Commentaries?.map(x => x.Text).join(".");

  if (
    specialEvent &&
    !content &&
    specialEvent.type === comment.TimelineType.Value &&
    t
  ) {
    content = t(comment.TimelineType.DisplayName);
  }

  return content;
};

const getCommentary: (
  comment: MatchCommentary,
  t?: Function
) => CommentaryType = (comment, t) => {
  const eventType = comment.TimelineType.Value;
  const specialEvent = specialEvents.filter(
    special => special.type === eventType
  );

  return {
    icon: getIcon(comment, specialEvent[0]),
    message: getMessage(comment, specialEvent[0], t)
  };
};

const isHiddenComment = (comment: CommentaryType): boolean => {
  return !comment.message || comment.message.length === 0;
};

const CommentaryRow: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation(ResourceType.SOCCER);
  const comment = getCommentary(props.comment, t);
  const specialEvent = comment.icon ? "special-event" : "";
  const isHidden = isHiddenComment(comment);
  

  if (!isHidden) {
    return (
      <div className={`commentary-row ${specialEvent}`}>
        <TimeCell comment={props.comment} />
        <div className="commentary-icon-cell">{comment.icon}</div>
        <CommentaryCell comment={comment.message} />
      </div>
    );
  }

  return null;
};

export default CommentaryRow;
