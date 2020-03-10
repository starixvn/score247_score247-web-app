import "../assets/styles/theme.scss";
import "../assets/styles/global.scss";
import React from "react";
import App, { AppContext } from "next/app";
import Sentry from "../common/helpers/sentry";
import { appWithTranslation } from "../common/helpers/Localizer";
import cookies from "next-cookies";
import DeviceHelper from "../common/helpers/device-helper";
import { CookieName, ViewMode } from "../common/constants";

import { DeviceContextProvider } from "../contexts/device-context";
import ViewModeSelect from "../components/view-mode-select";

interface CustomErrorInfo extends React.ErrorInfo {
  [key: string]: string;
}

class Score247App extends App<{
  showViewModeSelect: boolean;
  viewMode: string;
}> {
  static async getInitialProps(appContext: AppContext) {
    const isMobile = new DeviceHelper(appContext.ctx).isMobile();
    const viewMode = cookies(appContext.ctx)[CookieName.VIEW_MODE];
    const appProps = await App.getInitialProps(appContext);

    return { showViewModeSelect: isMobile && !viewMode, viewMode, ...appProps };
  }

  componentDidCatch(error: Error, errorInfo: CustomErrorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });

      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { showViewModeSelect, Component, pageProps, viewMode } = this.props;

    if (showViewModeSelect) {
      return <ViewModeSelect />;
    }

    return (
      <DeviceContextProvider value={{ isMobile: viewMode === ViewMode.MOBILE }}>
        <Component {...pageProps} />
      </DeviceContextProvider>
    );
  }
}

export default appWithTranslation(Score247App);
