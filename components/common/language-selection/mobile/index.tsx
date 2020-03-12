import "./style.scss";
import React, { RefObject } from "react";
import {
  Language,
  supportedLanguages,
  withTranslation
} from "../../../../common/helpers/Localizer";
import countryFlag from "../country-flag";
import { WithTranslation } from "next-i18next";
import { changeWidgetLanguage } from "../../../../common/helpers/widget";

type Props = {
  isActive: boolean;
  onFinished: () => void;
} & WithTranslation;

class Mobile extends React.PureComponent<Props> {
  wrapper: RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    this.wrapper = React.createRef();
  }

  handleLanguageChange = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const lang = event.currentTarget.dataset["lang"];
    if (lang && lang !== this.props.i18n.language) {
      this.props.i18n.changeLanguage(lang);
      changeWidgetLanguage(lang);
    }
  };

  renderLanguageOption = (language: Language) => {
    return (
      <div
        key={language.code}
        className="language-item"
        onClick={this.handleLanguageChange}
        data-lang={language.code}
      >
        <img src={`/static/images/${countryFlag[language.code]}`}></img>
        <span className="text">{language.name}</span>
        {this.props.i18n.language === language.code && (
          <span className="icon-check"></span>
        )}
      </div>
    );
  };

  handleClose = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const element = this.wrapper.current;
    if (element) {
      element.onanimationend = () => this.props.onFinished();
      element.style.animation = "fadeOut 0.2s ease-out";
    }
  };

  render() {
    return (
      <div
        className={`language-box ${this.props.isActive && "active"}`}
        ref={this.wrapper}
      >
        <div className="function-box">
          <div className="back-box" onClick={this.handleClose}>
            <span className="icon-caret-left"></span>
            <span>Back</span>
          </div>
          <span className="txt-title">Select Language</span>
          <span className="done" onClick={this.handleClose}>
            Done
          </span>
        </div>
        {supportedLanguages.map(this.renderLanguageOption)}
      </div>
    );
  }
}

export default withTranslation()(Mobile);
