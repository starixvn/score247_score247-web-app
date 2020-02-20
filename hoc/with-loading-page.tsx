import React from "react";
import { NextPageContext, NextComponentType } from "next";
import Router from "next/router";
import cookies from "next-cookies";
import cookie from 'js-cookie';
import DeviceHelper from "../common/helpers/device-helper";
import { DeviceContextProvider } from "../contexts/device-context";
import { ViewMode, HttpStatusCode, CookieName } from "../common/constants";
import { withTranslation } from "../common/helpers/Localizer";
import { WithTranslation } from "next-i18next";

type WithLoadingProps = {
  viewMode: string;
};

const withLoadingPage = <P extends object, IP = P>(
  WrappedComponent: NextComponentType<NextPageContext, IP, P>
) => {
  const Wrapper = (props: P & WithLoadingProps & WithTranslation) => {
    return (
      <DeviceContextProvider
        value={{ isMobile: props.viewMode === ViewMode.MOBILE }}
      >
        <WrappedComponent {...props} />
      </DeviceContextProvider>
    );
  };

  Wrapper.getInitialProps = async (ctx: NextPageContext) => {
    const loadingUrl = "/loading";
    const isMobile = new DeviceHelper(ctx).isMobile();
    const viewMode = cookies(ctx)[CookieName.VIEW_MODE];

    const { res } = ctx;

    if (isMobile && !viewMode) {
      if (res) {
        res.writeHead(HttpStatusCode.FOUND, { Location: loadingUrl });
        res.end();
      } else {
        Router.push(loadingUrl);
      }
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, viewMode };
  };

  return withTranslation()(Wrapper);
};

export default withLoadingPage;
