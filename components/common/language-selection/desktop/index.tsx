import React, { RefObject } from "react";
import { Language, supportedLanguages } from "../../../../common/helpers/Localizer";
import countryFlag from "../country-flag";

type State = {
    isOpen: boolean;
  };

  type Props = {
      onLanguageChange: (lang: string) => void;
      currentLanguage: string;
  };

class Desktop extends React.PureComponent<Props, State> {
    languageSelectionRef: RefObject<HTMLDivElement>;
  
    constructor(props: Props) {
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
      if (
        !this.languageSelectionRef.current?.contains(event.target as Node) &&
        this.state.isOpen
      ) {
        this.setState({ isOpen: false });
      }
    };
  
    toggleSelectList = () => this.setState({ isOpen: !this.state.isOpen });
  
    handleLanguageChange = (
      event: React.MouseEvent<HTMLLIElement, MouseEvent>
    ) => {
      const lang = event.currentTarget.dataset["lang"];
      if (lang && lang !== this.props.currentLanguage) {
        this.props.onLanguageChange(lang)
        this.setState({ isOpen: false });
      }
    };
  
    renderLanguageOption = (language: Language) => {
      return (
        <li
          key={language.code}
          className="language-item active"
          onClick={this.handleLanguageChange}
          data-lang={language.code}
        >
          <img src={`/static/images/${countryFlag[language.code]}`}></img>
          <span className="text">{language.name}</span>
          {this.props.currentLanguage === language.code && (
            <span className="icon-check"></span>
          )}
        </li>
      );
    };
  
    render() {
        const {currentLanguage} = this.props;
        
      return (
        <div className="language-box" ref={this.languageSelectionRef}>
          <div className="language-selection" onClick={this.toggleSelectList}>
            <img src={`/static/images/${countryFlag[currentLanguage]}`}></img>
            <span className="text">
              {supportedLanguages.find(x => x.code === currentLanguage)?.name}
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
  
  export default Desktop;
  