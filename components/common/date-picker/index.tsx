import "./style.scss";
import React, { PureComponent } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import { registerDatePickerLocale } from "./register-locale";
import { useTranslation } from "../../../common/helpers/Localizer";

registerDatePickerLocale();

function DatePickerWrapper(props: ReactDatePickerProps) {
  const { className, ...rest } = props;
  const { i18n } = useTranslation();
  
  return (
    <div className={`date-item datepicker-wrapper ${className}`}>
      <DatePicker locale={i18n.language} {...rest} />
    </div>
  );
}

export default DatePickerWrapper;
