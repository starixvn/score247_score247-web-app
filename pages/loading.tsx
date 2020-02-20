import React from "react";
import Router from 'next/router';
import cookie from 'js-cookie';
import { LocalizedPage, withTranslation } from "../common/helpers/Localizer";
import { ViewMode, CookieName, MobileAppUrl } from "../common/constants";
import Button from "../components/common/basic/button";
import "../assets/styles/pages/loading.scss";
import { ResourceType, CommonResourceKey } from "../common/resources";
import dynamic from "next/dynamic";

const LoadingPage: LocalizedPage = props => {
    const { t } = props;

    if(window.matchMedia("(display-mode: standalone)").matches){
        cookie.set(CookieName.VIEW_MODE, ViewMode.MOBILE);
        Router.push("/");
    }

    const handleDesktopViewClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        cookie.set(CookieName.VIEW_MODE, ViewMode.DESKTOP);
        Router.push("/");
    };

    const handleMobileViewClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        cookie.set(CookieName.VIEW_MODE, ViewMode.MOBILE);
        Router.push("/");
    };

    const handleAppStoreClick = () => {
        window.open(MobileAppUrl.APP_STORE, "_blank");
    };

    return (
        <div className="loading-page">
            <div className="title">{t(CommonResourceKey.SITE_TITLE)}</div>
            <div className="note">{t(CommonResourceKey.LOADING_PAGE_NOTE)}</div>
            <div className="content">
                <Button className="btn btn-mobile" onClick={handleMobileViewClick}>{t(CommonResourceKey.MOBILE)}</Button>
                <Button className="btn btn-primary-outline btn-desktop" onClick={handleDesktopViewClick}>{t(CommonResourceKey.DESKTOP)}</Button>
                <div className="divide">{t(CommonResourceKey.OR_MOBILE_APPLICATION)}</div>
                <Button className="btn btn-download" onClick={handleAppStoreClick}>{t(CommonResourceKey.DOWNLOAD_FROM_APP_STORE)}</Button>
                <div className="logo"> <img src="/static/images/score247.svg" alt="Logo" /></div>
            </div>
            <div className="footer">
                <span className="icon-copy-right"></span>{t(CommonResourceKey.COPYRIGHT)}
            </div>
        </div>
    );
};

LoadingPage.getInitialProps = () => ({
    namespacesRequired: [ResourceType.COMMON]
});

export default dynamic(() => Promise.resolve(withTranslation()(LoadingPage)), {ssr: false});