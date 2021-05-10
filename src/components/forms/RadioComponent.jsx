import React from "react";

// material-ui関連のインポート
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";

// ////////////////////////////////////////////////////
// FUNCTION ///////////////////////////////////////////
const RadioComponent = (props) => {
  const handleChange = (e) => {
    props.setRadioValue(e.target.value);
  };

  // ////////////////////////////////////////////////////
  // RETURN /////////////////////////////////////////////
  console.log("レンダー（RadioComponent.jsx）");
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{props.title}</FormLabel>
      <RadioGroup
        row
        aria-label={props.name}
        name={props.name}
        value={props.radioValue}
        onChange={handleChange}
      >
        {props.elements.map((element, index) => {
          return (
            <FormControlLabel
              key={index.toString()}
              value={element.value}
              control={<Radio color={element.color || "primary"} />}
              label={element.label}
              disabled={element.disabled}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioComponent;
