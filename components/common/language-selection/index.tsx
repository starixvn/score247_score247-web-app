import React from "react";
import "./style.scss";
import { useTranslation } from "../../../common/helpers/Localizer";
import { changeWidgetLanguage } from "../../../common/helpers/widget";
import { useDeviceContext } from "../../../contexts/device-context";

import Mobile from "./mobile";
import Desktop from "./desktop";

export default function LanguageSelection() {
  const { isMobile } = useDeviceContext();
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    changeWidgetLanguage(lang);
  };

  if (isMobile) {
    return (
      <Mobile
        currentLanguage={i18n.language}
        onLanguageChange={handleLanguageChange}
      />
    );
  }

  return (
    <Desktop
      currentLanguage={i18n.language}
      onLanguageChange={handleLanguageChange}
    />
  );
}
