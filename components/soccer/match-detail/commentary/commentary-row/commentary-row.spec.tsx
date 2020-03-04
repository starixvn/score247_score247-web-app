import * as React from "react";
import { shallow } from "enzyme";
import CommentaryRow from ".";
import { MatchCommentary, Commentary, Enumeration } from "../../../../../apis/soccer/models";
import { SoccerGoalMethod } from "../../../../../common/enums/soccer-goal-method";
import { EventTypes } from "../../../../../common/enums/event-type";

describe("<CommentaryRow />", () => {
  let normalComment: MatchCommentary;

  beforeAll(() => {
    const commentary: Commentary = {
      Text: "comment"
    };

    const timelineType: Enumeration = {
      Value: 0,
      DisplayName: ""
    };

    normalComment = {
      TimelineId: "1",
      TimelineType: timelineType,
      Time: [],
      MatchTime: 12,
      StoppageTime: null,
      Commentaries: [commentary],
      GoalScorer: null,
      IsPenaltyShootOutScored: false
    };
  })

  it("should render correctly", () => {
    const wrapper = shallow(<CommentaryRow comment={normalComment} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render icon own goal", () => {
    normalComment.TimelineType = {
      DisplayName: EventTypes.SCORE_CHANGE.displayName,
      Value: EventTypes.SCORE_CHANGE.value
    };

    normalComment.GoalScorer = {
      Id: "1",
      Name: "Name",
      Method: SoccerGoalMethod.OWN_GOAL
    };

    const wrapper = shallow(<CommentaryRow comment={normalComment} />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it("should render icon penalty goal", () => {
    normalComment.TimelineType = {
      DisplayName: EventTypes.SCORE_CHANGE.displayName,
      Value: EventTypes.SCORE_CHANGE.value
    };
    
    normalComment.GoalScorer = {
      Id: "1",
      Name: "Name",
      Method: SoccerGoalMethod.PENALTY
    };

    const wrapper = shallow(<CommentaryRow comment={normalComment} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render icon normal goal", () => {
    normalComment.TimelineType = {
      DisplayName: EventTypes.SCORE_CHANGE.displayName,
      Value: EventTypes.SCORE_CHANGE.value
    };
    
    normalComment.GoalScorer = {
      Id: "1",
      Name: "Name",
      Method: ""
    };

    const wrapper = shallow(<CommentaryRow comment={normalComment} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render icon red card", () => {
    normalComment.TimelineType = {
      DisplayName: EventTypes.RED_CARD.displayName,
      Value: EventTypes.RED_CARD.value
    };

    const wrapper = shallow(<CommentaryRow comment={normalComment} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render icon yellow card", () => {
    normalComment.TimelineType = {
      DisplayName: EventTypes.YELLOW_CARD.displayName,
      Value: EventTypes.YELLOW_CARD.value
    };

    const wrapper = shallow(<CommentaryRow comment={normalComment} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render icon yellow-to-red card", () => {
    normalComment.TimelineType = {
      DisplayName: EventTypes.YELLOW_RED_CARD.displayName,
      Value: EventTypes.YELLOW_RED_CARD.value
    };

    const wrapper = shallow(<CommentaryRow comment={normalComment} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render icon penalty-missed", () => {
    normalComment.TimelineType = {
      DisplayName: EventTypes.PENALTY_MISSED.displayName,
      Value: EventTypes.PENALTY_MISSED.value
    };

    normalComment.Commentaries = [];

    const wrapper = shallow(<CommentaryRow comment={normalComment} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render icon substitution", () => {
    normalComment.TimelineType = {
      DisplayName: EventTypes.SUBSTITUTION.displayName,
      Value: EventTypes.SUBSTITUTION.value
    };

    normalComment.Commentaries = null;

    const wrapper = shallow(<CommentaryRow comment={normalComment} />);
    expect(wrapper).toMatchSnapshot();
  });
});
