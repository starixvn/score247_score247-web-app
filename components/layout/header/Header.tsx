import * as React from "react";
import Top from "./top/Top";
import Navbar from "./navbar/Navbar";
import NavbarMobile from "./navbar/NavbarMobile";
import { useRouter } from "next/router";
import { SportsEnum } from "../../../common/enums/sport-enum";
import { useDeviceContext } from "../../../contexts/device-context";

const Header: React.FunctionComponent = () => {
  const { pathname } = useRouter();
  const href = pathname.split("/")[1];
  const sport =
    href === SportsEnum.BASKETBALL ||
    href === SportsEnum.ESPORTS ||
    href === SportsEnum.SOCCER
      ? href
      : SportsEnum.SOCCER;
  const { isMobile } = useDeviceContext();
  return (
    <header>
      <Top sport={sport} />
      {isMobile ? <NavbarMobile sport={sport} /> : <Navbar sport={sport} />}
    </header>
  );
};

export default Header;
