import React from "react";
import { shallow } from "enzyme";
import Outcomes, { Outcome } from "./index";
import { Props } from "./type";

describe("Outcomes", () => {
  it("should render Outcome if notes isnt empty", () => {
    const props: Props = {
      outcomes: [
        {
          DisplayName: "1",
          FriendlyName: "1",
          Value: 1
        },
        {
          DisplayName: "2",
          FriendlyName: "2",
          Value: 2
        },
        {
          DisplayName: "3",
          FriendlyName: "3",
          Value: 3
        }
      ]
    };

    const wrapper = shallow(<Outcomes {...props} />);
    expect(wrapper.find(Outcome).length).toEqual(props.outcomes.length);
  });

  it("should return null if notes is empty", () => {
    const props: Props = {
      outcomes: []
    };

    const wrapper = shallow(<Outcomes {...props} />);
    expect(wrapper.isEmptyRender()).toBeTruthy();
  });
});
