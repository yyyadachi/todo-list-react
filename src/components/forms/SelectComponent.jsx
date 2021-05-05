import React from "react";

// material-ui関連のインポート
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-label">{props.label}</InputLabel>
        <Select
          labelId="select-label"
          id="select-helper"
          //
          value={props.selectValue}
          onChange={props.setSelectValue}
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
    </div>
  );
};

export default SelectComponent;
