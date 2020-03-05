jest.mock("../../../../common/helpers/Localizer", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" }
  
    return Component;
  }
}));

import React from "react";
import { shallow } from "enzyme";
import EmptyRow from ".";
import * as DeviceContext from "../../../../contexts/device-context";


describe("<Commentary />", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<EmptyRow />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render row with coldSpan=6 when isMobile is true", () => {
    const method = jest.spyOn(DeviceContext, "useDeviceContext");
    method.mockImplementation(() => ({ isMobile: true }));

    const wrapper = shallow(<EmptyRow />);
    const cell = wrapper.find("td").first();

    expect(cell.props().colSpan).toEqual(6);

    method.mockRestore();
  });

  it("should render row with coldSpan=9 when isMobile is false", () => {
    const wrapper = shallow(<EmptyRow />);
    const cell = wrapper.find("td").first();

    expect(cell.props().colSpan).toEqual(9);
  });
});
