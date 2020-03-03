import * as React from "react";
import { shallow } from "enzyme";
import TimeCell from ".";
import { MatchCommentary } from "../../../../../apis/soccer/models";

describe("<TimeCell />", () => {
  let normalComment, commentHasStoppageTime, commentBeforeMatchStart: MatchCommentary;

  beforeAll(() => {
    normalComment = {
      TimelineId: 1,
      TimelineType: [],
      Time: [],
      MatchTime: 12,
      StoppageTime: null,
      Commentaries: [],
      GoalScorer: null,
      IsPenaltyShootOutScored: false
    };

    commentHasStoppageTime = Object.assign(normalComment, { MatchTime: 90, StoppageTime: 1 });

    commentBeforeMatchStart = Object.assign(normalComment, { MatchTime: 0 })
  })

  it("should render correctly", () => {
    const wrapper = shallow(<TimeCell comment={normalComment} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render correctly with stoppage time", () => {
    const wrapper = shallow(<TimeCell comment={commentHasStoppageTime} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render correctly comment before match-start event", () => {
    const wrapper = shallow(<TimeCell comment={commentBeforeMatchStart} />);
    expect(wrapper).toMatchSnapshot();
  });
});
