import "./style.scss"; 
import React, { Component } from "react";
import DatePicker from "../date-picker";
import { addDays, isSameDay, addYears } from "date-fns";
import { withTranslation } from "../../../common/helpers/Localizer";
import { State, Props } from "./type";
import { DateTimeFormat } from "../../../common/constants";
import CustomDateInput from "./custom-date-input";
import { formatDate } from "../../../common/helpers/date-time-helper";
import { ResourceType, CommonResourceKey } from "../../../common/resources";

class DateBar extends Component<Props, State> {
  today: Date;
  minDate: Date;
  maxDate: Date;
  afterTomorrow = 2;
  beforeYesterday = -2;

  constructor(props: Props) {
    super(props);

    this.today = new Date();
    this.minDate = addYears(this.today, -1);
    this.maxDate = addYears(this.today, 1);

    this.state = {
      dateList: [
        addDays(this.today, this.beforeYesterday),
        addDays(this.today, -1),
        this.today,
        addDays(this.today, 1),
        addDays(this.today, this.afterTomorrow)
      ]
    };
  }

  handleChange = (date: Date) => {
    this.props.onDateChange(date);
  };

  handleLiveMatchChange = () => {
    this.props.onLiveMatchChange();
  };

  renderDate = (date: Date) => {
    const className =
      !this.props.onlyLiveMatch && isSameDay(date, this.props.selectedDate)
        ? "date-item active"
        : "date-item";

    return (
      <div
        key={date.getDay()}
        className={className}
        onClick={() => this.handleChange(date)}
      >
        <div className="days">
          {isSameDay(date, this.today)
            ? this.props.t(CommonResourceKey.TODAY)
            : formatDate(date, DateTimeFormat.WEEKDAY, this.props.i18n.language)}
        </div>
        <div className="format-date">{formatDate(date, DateTimeFormat.DAY_MONTH_ONLY, this.props.i18n.language)}</div>
      </div>
    );
  };

  getDatePickerClassName = () => {
    if (this.state.dateList.some(d => isSameDay(d, this.props.selectedDate))) {
      return "";
    }

    return "active";
  };

  render() {
    const {i18n} = this.props;
    return (
      <div className="nav-date">
        <div className={`date-bar ${i18n.language === "vi" && "vi-lang"}`}>
          <span
            className={`date-item live-score ${this.props.onlyLiveMatch && "active"}`}
            onClick={this.handleLiveMatchChange}
          >
            <i className="icon-live" />
            <span className="has-live" />
          </span>
          {this.state.dateList.map(this.renderDate)}
          <DatePicker
            selected={this.props.selectedDate}
            onChange={this.handleChange}
            customInput={<CustomDateInput />}
            dateFormat={DateTimeFormat.DATE_ONLY}
            minDate={this.minDate}
            maxDate={this.maxDate}
            locale={i18n.language}
            showPopperArrow={false}
            className={this.getDatePickerClassName()}
            popperPlacement="end-right"
          />
        </div>
      </div>
    );
  }
}

export default withTranslation(ResourceType.COMMON)(DateBar);
