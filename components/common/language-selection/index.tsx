import React from "react";
import './style.scss';
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
    <>
      {/* <select
        value={i18n.language}
        onChange={event =>
          i18n
            .changeLanguage(event.target.value)
            .then(() => changeWidgetLanguage(i18n.language))
        }
      >
        {supportedLanguages.map(renderLanguageOption)}
      </select> */}
      <div className="language-box">
        <div className="language-selection">
          <img src="/static/images/flag_en.svg"></img>
          <span className="text">English</span>
          <span className="icon-arrow-down"></span>         
        </div>
        <ul className="ddl-language">
          <li className="language-item active">
            <img src="/static/images/flag_en.svg"></img>
            <span className="text">English</span>
            <span className="icon-check"></span>
          </li>
          <li className="language-item">
            <img src="/static/images/flag_indo.svg"></img>
            <span className="text">Bahasa Indonesia</span>
            <span className="icon-check"></span>
          </li>
          <li className="language-item">
            <img src="/static/images/flag_cn1.svg"></img>
            <span className="text">繁体中文</span>
            <span className="icon-check"></span>
          </li>
          <li className="language-item">
            <img src="/static/images/flag_cn2.svg"></img>
            <span className="text">体中文</span>
            <span className="icon-check"></span>
          </li>
          <li className="language-item">
            <img src="/static/images/flag_th.svg"></img>
            <span className="text">ไทย</span>
            <span className="icon-check"></span>
          </li>
          <li className="language-item">
            <img src="/static/images/flag_vn.svg"></img>
            <span className="text">Vietnamese</span>
            <span className="icon-check"></span>
          </li>
        </ul>
      </div>
    </>
  );
}
