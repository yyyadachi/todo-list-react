import React, { memo } from "react";

// material-ui関連のインポート
import {
  makeStyles,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
} from "@material-ui/core";

// material-uiの設定
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// ////////////////////////////////////////////////////
// FUNCTION ///////////////////////////////////////////
const SelectComponent = (props) => {
  const classes = useStyles();

  // ////////////////////////////////////////////////////
  // RETURN /////////////////////////////////////////////
  console.log("レンダー（SelectComponent.jsx）");
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="select-label">{props.label}</InputLabel>
      <Select
        labelId="select-label"
        id="select-helper"
        //
        value={props.selectValue}
        onChange={(e) =>
          props.setSelectValue({
            type: "handleChange",
            payload: { key: props.selectKey, value: e.target.value },
          })
        }
      >
        {/* **** ここからmap **** */}
        {props.elements.map((element, index) => {
          return (
            <MenuItem value={element.index} key={index.toString()}>
              {element.text}
            </MenuItem>
          );
        })}
        {/* **** ここまでmap **** */}
      </Select>
      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
};

export default memo(SelectComponent);
