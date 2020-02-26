import React, { useState } from "react";
import "./Top.scss";
import Select, { ValueType } from "react-select";
import Router from "next/router";
import { SportsEnum } from "../../../../common/enums/sport-enum";
import { filter } from "lodash";
import { WithTranslation } from "next-i18next";
import { withTranslation } from "../../../../common/helpers/Localizer";
import { ResourceType, CommonResourceKey } from "../../../../common/resources";
import { useDeviceContext } from "../../../../contexts/device-context";
import SideBar from "./side-bar";
import LanguageSelection from "../../../common/language-selection/desktop";

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

const Top: React.FunctionComponent<Props> = props => {
  const { t, sport } = props;
  const sportOptions = createOptions();
  const { isMobile } = useDeviceContext();
  const [showSideBar, setSideBar] = useState(false);

  if (isMobile) {
    return (
      <>
        <div className="header-top-mobile">
          <i className="icon-hambuger" onClick={()=> setSideBar(!showSideBar)} />
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
        <SideBar isActive={showSideBar} />
      </>
    );
  }

  return (
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
          <LanguageSelection />
          <div className="login">
            {t(CommonResourceKey.LOGIN)}/{t(CommonResourceKey.REGISTER)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation(ResourceType.COMMON)(Top);
