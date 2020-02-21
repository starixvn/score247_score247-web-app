import "./style.scss";
import React, { PureComponent } from "react";
import { addDays } from "date-fns";
import { formatDate } from "../../../common/helpers/date-time-helper";
import { DateTimeFormat } from "../../../common/constants";
import { Props } from "./type";
import { useTranslation } from "../../../common/helpers/Localizer";


class DateSwitch extends PureComponent<Props> {
  render() {
    const { currentDate, onClick } = this.props;
    const beforeCurrentDate = addDays(currentDate, -1);
    const afterCurrentDate = addDays(currentDate, 1);
    const { i18n } = useTranslation();
    
    return (
      <div className="calendar-switch">
        <button onClick={onClick.bind(this, beforeCurrentDate)} className="btn btn-primary-outline">
          {formatDate(
            beforeCurrentDate,
            DateTimeFormat.DATE_ONLY,
            i18n.language
          )}
        </button>
        <button onClick={onClick.bind(this, afterCurrentDate)} className="btn btn-primary-outline">
          {formatDate(
            afterCurrentDate,
            DateTimeFormat.DATE_ONLY,
            i18n.language
          )}
        </button>
      </div>
    );
  }
}

export default DateSwitch;
