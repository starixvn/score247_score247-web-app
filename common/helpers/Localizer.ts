import NextI18Next, { WithTranslation } from "next-i18next";
import { NextPage } from "next";

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: "en",
  otherLanguages: ["vi", "id", "th", "zhTW", "zhCN"]
});

export const {
  withTranslation,
  appWithTranslation,
  Link,
  i18n,
  useTranslation,
  Router
} = NextI18NextInstance;

export type LocalizedPage<P = {}, IP = P> = NextPage<
  P & WithTranslation,
  IP & { namespacesRequired: string[] }
>;

export default NextI18NextInstance;

export type Language = { code: string; name: string };
export const supportedLanguages: Language[] = [
  {
    code: "en",
    name: "English"
  },
  {
    code: "vi",
    name: "Tiếng Việt"
  },
  {
    code: "id",
    name: "Bahasa Indonesia"
  },
  {
    code: "th",
    name: "ไทย"
  },
  {
    code: "zhTW",
    name: "繁体中文"
  },
  {
    code: "zhCN",
    name: "体中文"
  }
];
