import React from "react";
import App from "next/app";
import Sentry from "../common/helpers/sentry";
import cookie from "js-cookie";
import { appWithTranslation } from "../common/helpers/Localizer";
import "../assets/styles/theme.scss";
import "../assets/styles/global.scss";
import { CookieName, ViewMode } from "../common/constants";

interface CustomErrorInfo extends React.ErrorInfo {
  [key: string]: string;
}

class Score247App extends App<{ isMobile: boolean }> {
  componentDidCatch(error: Error, errorInfo: CustomErrorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });

      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }

  componentDidMount(){
    if(window.matchMedia("(display-mode: standalone)").matches){
      cookie.set(CookieName.VIEW_MODE, ViewMode.MOBILE);
    }
  }

  render() {
    return super.render();
  }
}

export default appWithTranslation(Score247App);
