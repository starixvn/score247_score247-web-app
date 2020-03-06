import "./styles.scss";
import React from "react";
import Banner from '../../common/banner';

export const SoccerBanner = () => {
    return (
        <div className="banner-top">
            <div className="banner-left">
                <Banner imgSrc="/static/images/ads-banner-detail-2.png" url="#" />
            </div>
            <div className="banner-center">
                <Banner imgSrc="/static/images/ads-banner-1.png" url="#" />
            </div>
            <div className="banner-right">
                <Banner imgSrc="/static/images/ads-banner-detail-3.png" url="#" />
            </div>
        </div>
    );
};