import "./styles.scss";
import React from "react";
import appSettings from '../../../app-settings';

type Props = {
    leagueName?: string;
    countryCode?: string;
}

const LeagueInfo: React.FC<Props> = props => {
    return (
        <div className="league-name">
            <img src={props.countryCode ? `${appSettings.assetsUrl}/flags/${props.countryCode}.svg` : `/static/images/league-flag-default.svg`} />
            {props.leagueName}
        </div>
    );
};

export default LeagueInfo;