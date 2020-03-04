jest.mock("../../../../apis/soccer/soccer-api", () => ({
  SoccerAPI: {
    GetMatchCommentaries: async (id: string) => {
      const commentary = {
        Text: "comment"
      };

      const timelineType = {
        Value: 0,
        DisplayName: ""
      };

      const comment1 = {
        TimelineId: "1",
        TimelineType: timelineType,
        Time: [],
        MatchTime: 12,
        StoppageTime: null,
        Commentaries: [commentary],
        GoalScorer: null,
        IsPenaltyShootOutScored: false
      };

      const comment2 = { ...comment1 };
      comment2.MatchTime = 13;

      const comment3 = { ...comment1 };
      comment3.MatchTime = 13;

      const comment4 = { ...comment1 };
      comment4.MatchTime = 14;
      comment4.StoppageTime = "1";

      const comment5 = { ...comment1 };
      comment5.MatchTime = 14;
      comment5.StoppageTime = "2";

      return id ? [comment1, comment2, comment3, comment4, comment5] : null;
    }
  }
}));
jest.mock("../../../../common/helpers/Localizer", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" }

    return Component;
  }
}));
import * as React from "react";
import { shallow } from "enzyme";
import Commentary from ".";


describe("<Commentary />", () => {
  it("should render correctly with empty array", () => {
    const wrapper = shallow(<Commentary matchId="" date={new Date(0)} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render correctly when commentary has elements", () => {
    const wrapper = shallow(<Commentary matchId="1" date={new Date(0)} />);
    expect(wrapper).toMatchSnapshot();
  });
});
