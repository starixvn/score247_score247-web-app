import React from "react";
import { shallow } from "enzyme";
import Score from "./index";
import { MatchStatusType } from "../../../../../common/enums/match-status-type";

describe("Status", () => {
  it("should render correctly", () => {
    const props: any = {
      match: {
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
    expect(wrapper.dive().find(".status").length).toEqual(1);
  });
});
