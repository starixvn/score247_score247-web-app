jest.mock("../../../../app-settings");
import React from "react";
import { shallow, mount } from "enzyme";
import Top from "./Top";
import { SportsEnum } from "../../../../common/enums/sport-enum";
import Router from "next/router";
import { DeviceContextProvider } from "../../../../contexts/device-context";

jest.mock("../../../../common/helpers/Localizer", () => ({
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
jest.mock("next/router", () => ({ push: jest.fn(), useRouter: jest.fn() }));
jest.mock("../../../../contexts/device-context", () => ({
  useDeviceContext: () => ({ isMobile: true })
}))

describe("<Top/>", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<Top sport={SportsEnum.SOCCER} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should redirect when select sport in dropdown", () => {
    const wrapper = shallow(<Top sport={SportsEnum.SOCCER} />);

    wrapper.find(".sport-dropdown").simulate("change", {
      value: "/basketball",
      label: SportsEnum.BASKETBALL.toUpperCase()
    });
    expect(Router.push).toHaveBeenCalledWith("/basketball");
  });
});
