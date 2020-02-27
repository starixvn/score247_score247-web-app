import React, { useState } from "react";
import "./sidebar.scss";
import Mobile from "../../../../common/language-selection/mobile";
import {
  useTranslation,
  supportedLanguages
} from "../../../../../common/helpers/Localizer";
import { useRouter } from "next/router";
import { SportsEnum } from "../../../../../common/enums/sport-enum";

type Props = {
  isActive: boolean;
};

export default function SideBar(props: Props) {
  const { i18n, t } = useTranslation();
  const [showLanguageSelection, setLanguageSelection] = useState(false);
  const { pathname } = useRouter();
  const href = pathname.split("/")[1];
  const sport = href.toLowerCase() || SportsEnum.SOCCER;
  return (
    <>
      <div className={`push-menu ${props.isActive && "active"}`}>
        <div className="block-setting">
          <div className="block-title">Settings</div>
          <div className="block-content">
            <div className="row">
              <div className="key">
                <span className="icon-sport-de"></span>
                Default Sport
              </div>
              <div className="value">
                <span className="text">{t(sport)}</span>
                <span className="icon-arrow-down caret-right"></span>
              </div>
            </div>
            <div className="row" onClick={() => setLanguageSelection(true)}>
              <div className="key">
                <span className="icon-language-de"></span>
                Default Language
              </div>
              <div className="value">
                <span className="text">
                  {supportedLanguages.find(x => x.code === i18n.language)?.name}
                </span>
                <span className="icon-arrow-down caret-right"></span>
              </div>
            </div>
            <div className="row">
              <div className="key">
                <span className="icon-time-de"></span>
                Default Time Zone
              </div>
              <div className="value">
                <span className="text">GMT+7</span>
                <span className="icon-arrow-down caret-right"></span>
              </div>
            </div>
            <div className="row">
              <div className="key">
                <span className="icon-notification-de"></span>
                Notification
              </div>
              <div className="value"></div>
            </div>
          </div>
        </div>
        <div className="block-setting">
          <div className="block-title">information</div>
          <div className="block-content">
            <div className="row">
              <div className="key">
                <span className="icon-faq"></span>
                FAQ
              </div>
              <div className="value">
                <span className="icon-arrow-down caret right"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Mobile
        isActive={showLanguageSelection}
        onFinished={() => setLanguageSelection(false)}
      />
    </>
  );
}
