import React from "react";
import { render } from "enzyme";
import { Props } from "./type";
import FinalScoreCell from "./index";
import { PeriodType } from "../../../../common/enums/period-type";
import { DeviceContext } from "../../../../contexts/device-context";
import { MatchStatusType } from "../../../../common/enums/match-status-type";

describe("FinalScoreCell", () => {
  let props: Props;
  beforeEach(() => {
    props = {
      awayScore: 1,
      homeScore: 1,
      firstHalfPeriod: {
        AwayScore: 0,
        HomeScore: 1,
        Number: 1,
        PeriodType: {
          DisplayName: "regular",
          Value: PeriodType.Regular
        }
      },
      matchStatusId: MatchStatusType.SECOND_HALF.value,
      eventStatusId: MatchStatusType.LIVE.value
    };
  });

  it("should render first half period on mobile", () => {
    const wrapper = render(
      <DeviceContext.Provider value={{ isMobile: true }}>
        <FinalScoreCell {...props} />
      </DeviceContext.Provider>
    );
    expect(wrapper.find(".text-1H").length).toEqual(1);
  });

  it("should not render first half period on desktop", () => {
    const wrapper = render(
      <DeviceContext.Provider value={{ isMobile: false }}>
        <FinalScoreCell {...props} />
      </DeviceContext.Provider>
    );
    expect(wrapper.find(".text-1H").length).toEqual(0);
  });
});
