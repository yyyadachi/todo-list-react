import React from "react";

// material-ui、日付ピッカー関連のインポート
import "date-fns";
import DateFnsUtils from "@date-io/date-fns"; // v1.3.13
// import { format } from "date-fns"; // 追加
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

// ////////////////////////////////////////////////////
// FUNCTION ///////////////////////////////////////////
const DatePickerComponent = (props) => {
  // const handleDateChange = (date) => {
  //   if (props.isEdit === true) {
  //     props.setSelectedDate({
  //       ...props.editDetailTodo,
  //       deadline: format(date, "yyyy-MM-dd"),
  //     });
  //   } else {
  //     props.setSelectedDate(format(date, "yyyy-MM-dd"));
  //   }
  // };

  // ////////////////////////////////////////////////////
  // RETURN /////////////////////////////////////////////
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        autoOk={true} // 日付を選択したらポップアップを消去
        disabled={props.disabled}
        disableToolbar
        format="yyyy/MM/dd"
        id="datePicker"
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        label={props.label}
        margin="normal"
        variant="inline"
        //
        value={props.selectedDate}
        onChange={props.setSelectedDate}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerComponent;
