import React from "react";
import { shallow } from "enzyme";
import TeamStandings, { Row } from "./index";

describe("TeamStandings", () => {
  it("should render correctly", () => {
    const props: any = {
      teamStandings: [
        {
          Id: "1",
          Name: "Team 1"
        },
        {
          Id: "2",
          Name: "Team 2"
        }
      ]
    };

    const wrapper = shallow(<TeamStandings {...props} />);
    expect(wrapper.find(Row).length).toEqual(props.teamStandings.length);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("Row", () => {
  it("should high-light row if its one of current team", () => {
    const props: any = {
      Id: "1",
      Name: "Team 1",
      isHighLighted: true,
      Outcome: {
        Value: 1
      }
    };

    const wrapper = shallow(<Row {...props} />);
    expect(wrapper.find("tr").hasClass("highlight")).toBeTruthy();
  });
});
