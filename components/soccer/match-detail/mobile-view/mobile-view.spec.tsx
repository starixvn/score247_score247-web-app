jest.mock("../../../../app-settings");
import React from "react";
import { shallow } from "enzyme";
import Mobile from "./index";
import { PeriodType } from '../../../../common/enums/period-type';
import { MatchStatusType } from '../../../../common/enums/match-status-type';

describe("<Mobile />", () => {
    it("should render correctly", () => {
        const props: any = {
            matchInfo: {
                Match: {
                    AggregateAwayScore: 1,
                    AggregateHomeScore: 1,
                    MatchStatus: {
                        Value: 1,
                        DisplayName: "string"
                    },
                    MatchPeriods: [
                        {
                            HomeScore: 1,
                            AwayScore: 1,
                            PeriodType: {
                                DisplayName: "regular",
                                Value: PeriodType.Regular
                            },
                            Number: 1
                        },
                        {
                            HomeScore: 0,
                            AwayScore: 0,
                            PeriodType: {
                                DisplayName: "regular",
                                Value: PeriodType.Regular
                            },
                            Number: 2
                        },
                        {
                            HomeScore: 0,
                            AwayScore: 0,
                            PeriodType: {
                                DisplayName: "Overtime",
                                Value: PeriodType.Overtime
                            },
                            Number: 0
                        },
                        {
                            HomeScore: 4,
                            AwayScore: 3,
                            PeriodType: {
                                DisplayName: "Penalties",
                                Value: PeriodType.Penalties
                            },
                            Number: 0
                        }
                    ],
                    AggregateWinnerId: "A",
                    EventStatus: {
                        Value: MatchStatusType.AWAITING_EXTRA_TIME.value,
                        DisplayName: MatchStatusType.AWAITING_EXTRA_TIME.displayName
                    },
                    EventDate: [new Date]
                },
                TimelineEvents: [],
                Venue: {},
                Referee: "string",
                Attendance: 1,
            }
        };

        const wrapper = shallow(<Mobile {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
