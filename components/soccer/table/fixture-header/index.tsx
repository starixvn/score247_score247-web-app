import "../header/header.scss";
import React from "react";
import { DeviceContextConsumer } from "../../../../contexts/device-context";
import { DeviceContextType } from "../../../../contexts/device-context-type";
import { useTranslation } from "react-i18next";
import { SoccerResourceKey, ResourceType, CommonResourceKey } from "../../../../common/resources";

const Header = () => {
  const { t } = useTranslation([ResourceType.COMMON, ResourceType.SOCCER]);
  const header = ({ isMobile }: DeviceContextType) => (
    <thead>
      <tr>
        <th className="col-time">{t(CommonResourceKey.TIME)}</th>
        {!isMobile && <th className="col-status">{t(CommonResourceKey.STATUS)}</th>}
        <th className="col-home">{t(CommonResourceKey.HOME)}</th>
        <th className="col-score">{t(SoccerResourceKey.SCORE)}</th>
        <th className="col-away">{t(CommonResourceKey.AWAY)}</th>
        <th className="col-favorites"></th>
      </tr>
    </thead>
  );

  return <DeviceContextConsumer>{header}</DeviceContextConsumer>;
};

export default Header;
