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
            <img src={`${appSettings.assetsUrl}/flags/${props.countryCode}.svg`} />
            {props.leagueName}
        </div>
    );
};

export default LeagueInfo;