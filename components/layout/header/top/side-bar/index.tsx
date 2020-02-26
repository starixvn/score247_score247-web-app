import React from "react";
import "./sidebar.scss";
import LanguageSelection from "../../../../common/language-selection";

export default function SideBar() {
  return (
    <>
      <i className="icon-hambuger" />
      <div className="push-menu">
        <div className="block-setting">
          <div className="block-title">Settings</div>
          <div className="block-content">
            <div className="row">
              <div className="key">
                <span className="icon-sport-de"></span>
                Default Sport
              </div>
              <div className="value">
                <span className="text">Soccer</span>
                <span className="icon-arrow-down caret-right"></span>
              </div>
            </div>
            <div className="row">
              <div className="key">
                <span className="icon-language-de"></span>
                Default Language
              </div>
              <div className="value">
            <img src="/static/images/flag_en.svg"></img>
                <span className="text">English</span>
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
      <LanguageSelection />
    </>
  );
}
