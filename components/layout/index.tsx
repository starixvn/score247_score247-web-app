import "./style.scss";
import React, { useEffect } from "react";
import Head from "next/head";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Breadcrumbs from "../common/bread-crumbs";
import { DeviceContextConsumer } from "../../contexts/device-context";
import { WithTranslation } from "next-i18next";
import { withTranslation } from "../../common/helpers/Localizer";
import { ResourceType, CommonResourceKey } from "../../common/resources";
import { initializeWidget } from "../../common/helpers/widget";

type Props = {
  title?: string;
  breadcrumbs?: string[];
} & WithTranslation;

const Layout: React.FunctionComponent<Props> = ({ children, title = "Home", breadcrumbs = [""], t, i18n }) => {
  const className = (isMobile: boolean) => {
    return isMobile ? "wrap-page mobile" : "wrap-page";
  };

  useEffect(() => {
    initializeWidget(i18n.language);
  }, []);

  return (
    <DeviceContextConsumer>
      {({ isMobile }) => (
        <div className={className(isMobile)}>
          <Head>
            <title>{title} | {t(CommonResourceKey.SITE_TITLE)}</title>
            {!isMobile && <meta name="viewport" content="initial-scale=0.3,user-scalable=yes" />}
          </Head>
          <Header />
          <div className="container">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <div className="wrap-content">
              {children}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </DeviceContextConsumer>

  );
};

export default withTranslation(ResourceType.COMMON)(Layout);
