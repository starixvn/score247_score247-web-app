import "react-datepicker/src/stylesheets/datepicker.scss";
import "./style.scss";

import React from 'react';
import DatePicker, { ReactDatePickerProps, registerLocale } from "react-datepicker";
import vi from 'date-fns/locale/vi';

registerLocale("vi", vi);

export default React.memo(function(props: ReactDatePickerProps) {
    return <DatePicker {...props} />;
});
