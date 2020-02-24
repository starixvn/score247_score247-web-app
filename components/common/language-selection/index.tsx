import React from "react";
import {
  Language,
  supportedLanguages,
  useTranslation
} from "../../../common/helpers/Localizer";
import { changeWidgetLanguage } from "../../../common/helpers/widget";

function renderLanguageOption(language: Language) {
  return (
    <option key={language.code} value={language.code}>
      {language.name}
    </option>
  );
}

export default function LanguageSelection() {
  const { i18n } = useTranslation();

  return (
    <select
      value={i18n.language}
      onChange={event =>
        i18n
          .changeLanguage(event.target.value)
          .then(() => changeWidgetLanguage(i18n.language))
      }
    >
      {supportedLanguages.map(renderLanguageOption)}
    </select>
  );
}
