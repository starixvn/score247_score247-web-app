import React from "react";
import { shallow } from "enzyme";
import Score from "./index";
import { MatchStatusType } from "../../../../../common/enums/match-status-type";
import { PeriodType } from "../../../../../common/enums/period-type";
import { Props } from "./type";

describe("Score", () => {
  it("should not render total score, half score with pre match", () => {
    const props: any = {
      match: {
        MatchPeriods: [],
        HomeScore: 0,
        AwayScore: 0,
        EventStatus: {
          Value: MatchStatusType.NOT_STARTED.value,
          DisplayName: MatchStatusType.NOT_STARTED.displayName
        },
        MatchStatus: null
      }
    };

    const wrapper = shallow(<Score {...props} />);
    expect(wrapper.find(".half-score").length).toEqual(0);
    expect(wrapper.find(".home-score").text).toHaveLength(0);
    expect(wrapper.find(".away-score").text).toHaveLength(0);
  });

  it("should render total score and shouldnt render half score when the match is in 1st", () => {
    const props: any = {
      match: {
        MatchPeriods: [
          {
            AwayScore: 0,
            HomeScore: 1,
            PeriodType: {
              Value: PeriodType.Regular,
              DisplayName: "regular"
            },
            Number: 1
          }
        ],
        HomeScore: 1,
        AwayScore: 0,
        EventStatus: {
          Value: MatchStatusType.LIVE.value,
          DisplayName: MatchStatusType.LIVE.displayName
        },
        MatchStatus: {
          Value: MatchStatusType.FIRST_HALF.value,
          DisplayName: MatchStatusType.FIRST_HALF.displayName
        },
        CurrentPeriodStartTime: [new Date()]
      }
    };

    const wrapper = shallow(<Score {...props} />);
    expect(wrapper.find(".half-score").length).toEqual(0);
    expect(wrapper.find(".home-score").text()).toEqual(
      props.match.HomeScore.toString()
    );
    expect(wrapper.find(".away-score").text()).toEqual(
      props.match.AwayScore.toString()
    );
  });

  it("should render total score and  half score when the match passes 1st period", () => {
    const props: any = {
      match: {
        MatchPeriods: [
          {
            AwayScore: 0,
            HomeScore: 1,
            PeriodType: {
              Value: PeriodType.Regular,
              DisplayName: "regular"
            },
            Number: 1
          },
          {
            AwayScore: 0,
            HomeScore: 1,
            PeriodType: {
              Value: PeriodType.Regular,
              DisplayName: "regular"
            },
            Number: 2
          }
        ],
        HomeScore: 1,
        AwayScore: 0,
        EventStatus: {
          Value: MatchStatusType.LIVE.value,
          DisplayName: MatchStatusType.LIVE.displayName
        },
        MatchStatus: {
          Value: MatchStatusType.SECOND_HALF.value,
          DisplayName: MatchStatusType.SECOND_HALF.displayName
        },
        CurrentPeriodStartTime: [new Date()]
      }
    };

    const wrapper = shallow(<Score {...props} />);
    expect(wrapper.find(".half-score").length).toEqual(1);
    expect(wrapper.find(".home-score").text()).toEqual(
      props.match.HomeScore.toString()
    );
    expect(wrapper.find(".away-score").text()).toEqual(
      props.match.AwayScore.toString()
    );
  });
});
