jest.mock("../../../../app-settings");
jest.mock("../../../../common/helpers/Localizer");

import React from "react";
import { shallow } from "enzyme";
import GeneralInfo from "./index";

describe("<GeneralInfo />", () => {
    it("should render correctly", () => {
        const props: any = {
            match: {
                HomeTeamName: "home",
                HomeScore: 1,
                AwayTeamName: "away",
                AwayScore: 1,
                EventDate: [new Date()]
            }
        };

        const wrapper = shallow(<GeneralInfo {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
