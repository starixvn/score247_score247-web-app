import * as React from "react";
import { shallow } from "enzyme";
import CommentaryRow from ".";
import { MatchCommentary, Commentary, Enumeration } from "../../../../../apis/soccer/models";

describe("<CommentaryRow />", () => {
  let normalComment: MatchCommentary;

  beforeAll(() => {
    const commentary: Commentary = {
      Text: "comment"
    }

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
});
