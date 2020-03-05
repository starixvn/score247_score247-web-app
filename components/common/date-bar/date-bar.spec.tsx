import React from "react";
import { shallow, mount } from "enzyme";
import { State, Props } from "./type";
import DateBar from "./index";
import DatePicker from "../date-picker";

jest.mock("../../../common/helpers/Localizer", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" }

    return Component;
  },
  useTranslation: () => ({
    t: (key: string): string => key,
    i18n: {
      language: "en",
      languages: ["en", "fr"],
      isInitialized: true
    }
  })
}));

describe("DateBar", () => {
  let props: Props;

  beforeEach(() => {
    const instance: any = {
      language: "en",
      languages: ["en", "fr"],
      isInitialized: true
    };

    props = {
      onDateChange: jest.fn(),
      onLiveMatchChange: jest.fn(),
      onlyLiveMatch: false,
      selectedDate: new Date(),
      t: (key: string): string => key,
      i18n: instance,
      tReady: true
    };
  });

  it("render correctly", () => {
    const wrapper = shallow(<DateBar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onLiveMatchChange when clicking on live match button", () => {
    const wrapper = shallow(<DateBar {...props} />);
    wrapper
      .find(".live-score")
      .at(0)
      .simulate("click");
    expect(props.onLiveMatchChange).toBeCalled();
  });

  it("should call onDateChange when clicking on date button", () => {
    const wrapper = shallow(<DateBar {...props} />);
    wrapper
      .find("div.date-item")
      .at(0)
      .simulate("click");
    expect(props.onDateChange).toBeCalled();
  });

  it("should not active when not the same day", () => {
    const instance: any = {
      language: "en",
      languages: ["en", "fr"],
      isInitialized: true
    };

    const notSameDayProps = {
      onDateChange: jest.fn(),
      onLiveMatchChange: jest.fn(),
      onlyLiveMatch: false,
      selectedDate: new Date(2019, 1, 1),
      t: (key: string): string => key,
      i18n: instance,
      tReady: true,
      isHavingLiveMatches: true
    };

    const wrapper = mount(<DateBar {...notSameDayProps} />);
    expect(wrapper.find(DatePicker).hasClass("active")).toBeTruthy();
  });
});
