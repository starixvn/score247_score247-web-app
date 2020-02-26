import React from "react";
import { WithTranslation } from "next-i18next";

export const withTranslation = function () {
  return function (Component: React.ComponentType<WithTranslation>) {
    return function (props: WithTranslation) {
      const hook = useTranslation();

      const passDownProps: any = { //NOSONAR
        ...props,
        ...hook,
        tReady: true,
      };

      return <Component {...passDownProps} />;
    };
  };
};

export const i18n = {
  language: "en",
  languages: ["en", "fr"],
  isInitialized: true
};

export const useTranslation = () => ({
  t: (key: string): string => key,
  i18n
});