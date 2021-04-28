import React from "react";

// material-ui関連のインポート
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const RadioComponent = (props) => {
  const handleChange = (e) => {
    props.setRadioValue(e.target.value);
  };

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
