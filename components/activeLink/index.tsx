import React, { Children } from "react";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";
import { ReactElementLike } from "prop-types";
import { SportsEnum } from "../../common/sportenum";
import { Link } from '../../common/helpers/Localizer';

interface IProps extends WithRouterProps {
  href: string;
  children: ReactElementLike;
  activeClassName: string;
  listItemClassName: string;
}

const ActiveLink: React.FunctionComponent<IProps> = ({ router, children, href, activeClassName, listItemClassName, ...props }) => {
  const child = Children.only(children);
  const childClassName = child.props.className || "";

  let className = "";
  if (router.pathname === href) {
    className = `${listItemClassName} ${activeClassName}`.trim();
  } else {
    const sport = router.pathname.split("/")[1];
    if (
      sport === href.replace("/", "") &&
      (sport === SportsEnum.BASKETBALL || sport === SportsEnum.ESPORTS || sport === SportsEnum.SOCCER)
    ) {
      className = `${listItemClassName} ${activeClassName}`.trim();
    } else {
      className = `${listItemClassName}`.trim();
    }
  }

  return (
    <li className={className}>
      <Link href={href} {...props}>
        {React.cloneElement(child, {
          className: childClassName || null
        })}
      </Link>
    </li>
  );
};

export default withRouter(ActiveLink);
