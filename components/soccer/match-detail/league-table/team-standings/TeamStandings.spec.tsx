import React from "react";
import { shallow } from "enzyme";
import TeamStandings, { Row } from "./index";
describe("TeamStandings", () => {
  it("should render correctly", () => {
    const props: any =  {
       teamStandings: [{
         Id: "1",
         Name: "Team 1"
       },
       {
        Id: "2",
        Name: "Team 2"
      }]
    }

    const wrapper = shallow(<TeamStandings {...props} />);
    expect(wrapper.find(Row).length).toEqual(props.teamStandings.length);
    expect(wrapper).toMatchSnapshot();
  });
});
