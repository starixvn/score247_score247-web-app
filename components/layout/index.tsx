import "./style.scss";
import React from "react";
import Head from "next/head";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Breadcrumbs from "../common/bread-crumbs";
import { DeviceContextConsumer } from "../../contexts/device-context";
import { WithTranslation } from "next-i18next";
import { withTranslation } from "../../common/helpers/Localizer";
import { ResourceType, CommonResourceKey } from "../../common/resources";

type Props = {
  title?: string;
  breadcrumbs?: string[];
} & WithTranslation;

const Layout: React.FunctionComponent<Props> = ({ children, title = "Home", breadcrumbs = [""], t }) => {
  const className = (isMobile: boolean) => {
    return isMobile ? "wrap-page mobile" : "wrap-page";
  };

  return (
    <DeviceContextConsumer>
      {({ isMobile }) => (
        <div className={className(isMobile)}>
          <Head>
            <title>{title} | {t(CommonResourceKey.SITE_TITLE)}</title>
            {!isMobile && <meta name="viewport" content="initial-scale=0" />}
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
