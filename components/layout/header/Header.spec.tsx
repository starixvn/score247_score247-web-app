jest.mock("../../../app-settings");
import * as React from "react";
import { shallow } from "enzyme";
import Header from "./Header";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "/",
      query: "",
      asPath: ""
    };
  }
}));

describe("<Header/>", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
