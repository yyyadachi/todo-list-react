import React, { memo } from "react";

// material-ui、日付ピッカー関連のインポート
import "date-fns";
import DateFnsUtils from "@date-io/date-fns"; // v1.3.13
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

// date-fnsをインポート
import { format } from "date-fns";

// ////////////////////////////////////////////////////
// FUNCTION ///////////////////////////////////////////
const DatePickerComponent = (props) => {
  // ////////////////////////////////////////////////////
  // RETURN /////////////////////////////////////////////
  console.log("レンダー（DatePickerComponent.jsx） 制御完了");
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {/** <></>は Warning: Failed prop type: Invalid prop `children` supplied to `MuiPickersUtilsProvider`. の回避 */}
      <>
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
          // onChange={props.setSelectedDate}
          onChange={(date) =>
            props.setSelectedDate({
              type: "handleChange",
              payload: {
                key: "tmpDeadline",
                value: format(date, "yyyy-MM-dd"),
              },
            })
          }
        />
      </>
    </MuiPickersUtilsProvider>
  );
};

export default memo(DatePickerComponent);
