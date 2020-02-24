import React from "react";
import {
  Language,
  supportedLanguages,
  useTranslation,
  Router
} from "../../../common/helpers/Localizer";

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
      onChange={event => {i18n.changeLanguage(event.target.value).then(() => Router.reload()); }}
    >
      {supportedLanguages.map(renderLanguageOption)}
    </select>
  );
}

