import React from "react";
import {
  Language,
  i18n,
  supportedLanguages
} from "../../../common/helpers/Localizer";

function renderLanguageOption(language: Language) {
  return (
    <option key={language.code} value={language.code}>
      {language.name}
    </option>
  );
}

export default function LanguageSelection() {
  return (
    <select
      value={i18n.language}
      onChange={event => i18n.changeLanguage(event.target.value)}
    >
      {supportedLanguages.map(renderLanguageOption)}
    </select>
  );
}
