import * as React from "react";
import { shallow } from "enzyme";
import CommentaryCell from ".";

describe(`<CommentaryCell />`, () => {
  it("should render correctly", () => {
    const wrapper = shallow(<CommentaryCell comment="comment" />);
    expect(wrapper).toMatchSnapshot();
  });
});
