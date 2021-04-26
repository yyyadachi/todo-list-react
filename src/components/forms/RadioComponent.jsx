import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const RadioComponent = (props) => {
  const defaultElement = props.defaultElement - 1 || 0; //何個目の選択肢をデフォルトとするか。指定なければ0（1個目）。
  const [radioValue, setRadioValue] = useState(defaultElement);

  const handleChange = (event) => {
    setRadioValue(Number(event.target.value));
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{props.title}</FormLabel>
      <RadioGroup
        row
        aria-label="position"
        name="position"
        value={radioValue}
        onChange={handleChange}
      >
        {props.elements.map((element, index) => {
          return (
            <FormControlLabel
              key={index.toString()}
              value={index}
              control={<Radio color={element.color || "primary"} />}
              label={element.label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioComponent;
