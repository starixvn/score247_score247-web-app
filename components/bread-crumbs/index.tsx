import "./style.scss";
import React, { PureComponent } from "react";
import { State, Props } from "./type";
import { format, isSameDay } from "date-fns";
import { WithTranslation } from "next-i18next";
import { withTranslation } from "../../common/helpers/Localizer";

class Breadcrumbs extends PureComponent<Props & WithTranslation, State> {
  today: Date = new Date();

  constructor(props: Props & WithTranslation) {
    super(props);
  }

  render() {
    const { selectedDate, onlyLiveMatch, t } = this.props;

    return (
      <div className="site-info">
        <div className="breadcrumbs">
          <span className="selected-sport">{t("soccer")} / </span>
          <span className="selected-date">
            {onlyLiveMatch
              ? t("livematch")
              : isSameDay(selectedDate, this.today)
            ? t("today").toUpperCase()
              : format(selectedDate, "dd MMM yyyy")}
          </span>
        </div>
        <div className="GMT-time">{format(this.today, "H:mm OOO")}</div>
      </div>
    );
  }
}

export default withTranslation("common")(Breadcrumbs);
