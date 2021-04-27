import React from "react";
import TextField from "@material-ui/core/TextField";

const TextInputComponent = (props) => {
  return (
    <>
      <TextField
        id="textInput"
        label={props.label}
        variant="outlined"
        fullWidth={props.isFullWidth}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      />
    </>
  );
};

export default TextInputComponent;
