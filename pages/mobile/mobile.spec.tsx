jest.mock("../../app-settings");
jest.mock("../../hoc/with-loading-page", () => Component => {
  Component.defaultProps = { ...Component.defaultProps, t: () => "" }

  return Component;
})

import * as React from "react";
import { shallow } from "enzyme";
import Mobile from ".";


describe("<Commentary />", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<Mobile viewMode=""/>);
    expect(wrapper).toMatchSnapshot();
  });
});
