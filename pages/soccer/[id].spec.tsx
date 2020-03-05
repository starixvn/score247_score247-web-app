jest.mock("../../common/helpers/Localizer", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" }
  
    return Component;
  }
}));
jest.mock("../../app-settings");
jest.mock("../../hoc/with-loading-page", () => Component => {
  Component.defaultProps = { ...Component.defaultProps, t: () => "" }

  return Component;
})

import * as React from "react";
import { shallow } from "enzyme";
import SoccerPage from "./[id]";


describe("<Commentary />", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<SoccerPage matchId={""} viewMode=""/>);
    expect(wrapper).toMatchSnapshot();
  });
});
