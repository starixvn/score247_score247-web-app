import { WithTranslation } from "next-i18next";

export type Props = {
  currentDate: Date;
  onClick(date: Date): void;
} & WithTranslation;
