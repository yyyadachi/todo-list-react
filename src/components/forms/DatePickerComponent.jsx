import React, { useEffect } from "react";

// material-ui、日付ピッカー関連のインポート
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const DatePickerComponent = (props) => {
  // 初期値を代入（日付を設定）
  const today = new Date();
  useEffect(() => {
    props.setSelectedDate(
      props.interval ? today.setDate(today.getDate() + props.interval) : null
    );
  }, []);

  const handleDateChange = (date) => {
    props.setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="yyyy/MM/dd"
        margin="normal"
        id="datePicker"
        label={props.label}
        value={props.selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerComponent;
