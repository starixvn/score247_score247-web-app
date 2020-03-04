import React from "react";
import { shallow } from "enzyme";
import Notes, { TeamNote } from "./index";
import { Props } from "./type";
describe("Notes", () => {
  it("should render TeamNote if notes isnt empty", () => {
    const props: Props =  {
        notes: [
            {
                TeamId: "1",
                TeamName: "TeamA",
                Comments: ["Comment 1", "Comment 2"]
            }
        ]
    }

    const wrapper = shallow(<Notes {...props} />);
    expect(wrapper.find(TeamNote).length).toEqual(props.notes.length);
  });

  it("should return null if notes is empty", () => {
    const props: Props =  {
        notes: []
    }

    const wrapper = shallow(<Notes {...props} />);
    expect(wrapper.isEmptyRender()).toBeTruthy();
  });
});
