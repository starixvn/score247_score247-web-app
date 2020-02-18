import "./style.scss";
import React from "react";
import { Props } from "./type";
import { useDeviceContext } from "../../../../contexts/device-context";
import DesktopView from "./desktop-view";
import MobileView from "./mobile-view";

const GeneralInfo: React.FC<Props> = props => {
  const { match } = props;
  const { isMobile } = useDeviceContext();
  
  if (isMobile) {
    return <MobileView match={match} />;
  }
  
  return <DesktopView match={match} />;
};

export default GeneralInfo;
