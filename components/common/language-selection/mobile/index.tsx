import React from "react";
import {
  Language,
  supportedLanguages
} from "../../../../common/helpers/Localizer";
import countryFlag from "../country-flag";

type Props = {
  onLanguageChange: (lang: string) => void;
  currentLanguage: string;
};

class Mobile extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  handleLanguageChange = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const lang = event.currentTarget.dataset["lang"];
    if (lang && lang !== this.props.currentLanguage) {
      this.props.onLanguageChange(lang);
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
        {this.props.currentLanguage === language.code && (
          <span className="icon-check"></span>
        )}
      </div>
    );
  };

  render() {
    return (
      <div className="language-box">
        {supportedLanguages.map(this.renderLanguageOption)}
      </div>
    );
  }
}

export default Mobile;
