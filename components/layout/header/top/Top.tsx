import React from "react";
import "./Top.scss";
import Select, { ValueType } from "react-select";
import Router from "next/router";
import { SportsEnum } from "../../../../common/enums/sport-enum";
import { filter } from "lodash";
import { WithTranslation } from "next-i18next";
import {
  withTranslation,
  supportedLanguages,
  Language
} from "../../../../common/helpers/Localizer";
import { ResourceType, CommonResourceKey } from "../../../../common/resources";

type Props = {
  sport: string;
} & WithTranslation;

interface SelectOptions {
  value: string;
  label: JSX.Element;
  forSport: string;
}

const createOptions = () => {
  const createdOptions = [];
  for (const item in SportsEnum) {
    const icon = `icon-${item.toLowerCase()}`;
    const labelWithIcon = (
      <span>
        <i className={icon} />
        {item}
      </span>
    );
    if (item.toLowerCase() === SportsEnum.SOCCER) {
      createdOptions.push({
        value: "/",
        label: labelWithIcon,
        forSport: item
      });
    } else {
      createdOptions.push({
        value: `/${item.toLowerCase()}`,
        label: labelWithIcon,
        forSport: item
      });
    }
  }
  return createdOptions;
};

const onChangeSportMobile = (selectedOption: ValueType<SelectOptions>) => {
  const option = selectedOption as SelectOptions;
  Router.push(option.value);
};

const renderLanguageOption = (language: Language) => (
  <option key={language.code} value={language.code}>
    {language.name}
  </option>
);

const Top: React.FunctionComponent<Props> = props => {
  const { t, sport, i18n } = props;
  const sportOptions = createOptions();
  return (
    <>
      <div className="header-top">
        <div className="container">
          <div className="logo">
            <img src="/static/images/Logo.png" alt="Logo" />
            <img
              className="logo-text"
              src="/static/images/SCORE247.png"
              alt="Logo"
            />
          </div>
          <div className="user-languages">
            <select
              value={i18n.language}
              onChange={event => i18n.changeLanguage(event.target.value)}
            >
              {supportedLanguages.map(renderLanguageOption)}
            </select>
            <div className="login">
              {t(CommonResourceKey.LOGIN)}/{t(CommonResourceKey.REGISTER)}
            </div>
          </div>
        </div>
      </div>
      <div className="header-top-mobile">
        <i className="icon-hambuger" />
        <Select
          instanceId={sport}
          className="sport-dropdown"
          classNamePrefix="select"
          options={sportOptions}
          value={filter(sportOptions, { forSport: `${sport.toUpperCase()}` })}
          onChange={onChangeSportMobile}
          isSearchable={false}
        />
      </div>
    </>
  );
};

export default withTranslation(ResourceType.COMMON)(Top);
