import { WithTranslation } from "next-i18next";

export type State = {
  dateList: Array<Date>;
};

export type Props = {
  onDateChange: (date: Date) => void;
  onLiveMatchChange: () => void;
  selectedDate: Date;
  onlyLiveMatch: boolean,
  isHavingLiveMatches: boolean
} & WithTranslation;
