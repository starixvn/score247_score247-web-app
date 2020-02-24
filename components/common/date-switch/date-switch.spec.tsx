import React from "react";
import { shallow } from "enzyme";
import DateSwitch from "./index";

jest.mock("../../common/helpers/Localizer", () =>
  jest.requireActual("../../common/helpers/__mocks__/Localizer")
);

describe("DateSwitch", () => {
  let props: any;

  beforeEach(() => {
    props = {
      onClick: jest.fn(),
      currentDate: new Date(),
      i18n: { language: "en" },
      t: jest.fn()
    };
  });

  it("should call onClick when clicking on button", () => {
    const wrapper = shallow(<DateSwitch {...props} />);
    wrapper
      .dive()
      .find("button")
      .at(0)
      .simulate("click");
    expect(props.onClick).toBeCalled();
  });
});
