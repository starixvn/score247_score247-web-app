jest.mock("../../app-settings");
import React from "react";
import { shallow } from "enzyme";
import Layout from ".";

describe("<Layout />", () => {
  const children = <div>some text</div>;
  it("Should render correctly", () => {
    const wrapper = shallow(<Layout>{children}</Layout>);
    expect(wrapper).toMatchSnapshot();
  });
});
