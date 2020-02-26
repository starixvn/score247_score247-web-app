import React, { RefObject } from "react";
import "./style.scss";
import {
  Language,
  supportedLanguages,
  withTranslation
} from "../../../common/helpers/Localizer";
import { changeWidgetLanguage } from "../../../common/helpers/widget";
import { WithTranslation } from "next-i18next";
import ReactDOM from "react-dom";

const countryFlag: { [key: string]: string } = {
  en: "flag_en.svg",
  vi: "flag_vn.svg",
  id: "flag_indo.svg",
  th: "flag_th.svg",
  zhTW: "flag_cn1.svg",
  zhCN: "flag_cn2.svg"
};

type State = {
  isOpen: boolean;
};

class LanguageSelection extends React.PureComponent<WithTranslation, State> {
  languageSelectionRef: RefObject<HTMLDivElement>;

  constructor(props: WithTranslation) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.languageSelectionRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside = (event: Event) => {
    ReactDOM.findDOMNode(this);

    if (
      !this.languageSelectionRef.current?.contains(event.target as Node) &&
      this.state.isOpen
    ) {
      this.setState({ isOpen: false });
    }
  };

  toggleSelectList = () => this.setState({ isOpen: !this.state.isOpen });

  handleChangeLanguage = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const lang = event.currentTarget.dataset["lang"];
    if (lang && lang !== this.props.i18n.language) {
      this.props.i18n.changeLanguage(lang);
      this.setState({ isOpen: false });
    }
  };

  renderLanguageOption = (language: Language) => {
    return (
      <li
        key={language.code}
        className="language-item active"
        onClick={this.handleChangeLanguage}
        data-lang={language.code}
      >
        <img src={`/static/images/${countryFlag[language.code]}`}></img>
        <span className="text">{language.name}</span>
        {this.props.i18n.language === language.code && (
          <span className="icon-check"></span>
        )}
      </li>
    );
  };

  render() {
    const { i18n } = this.props;

    return (
      <div className="language-box" ref={this.languageSelectionRef}>
        <div className="language-selection" onClick={this.toggleSelectList}>
          <img src={`/static/images/${countryFlag[i18n.language]}`}></img>
          <span className="text">
            {supportedLanguages.find(x => x.code === i18n.language)?.name}
          </span>
          <span className="icon-arrow-down"></span>
        </div>
        <ul className={`ddl-language ${this.state.isOpen && "open"}`}>
          {supportedLanguages.map(this.renderLanguageOption)}
        </ul>
      </div>
    );
  }
}

export default withTranslation()(LanguageSelection);
