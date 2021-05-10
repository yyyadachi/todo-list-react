import React from "react";
import TextField from "@material-ui/core/TextField";

// ////////////////////////////////////////////////////
// FUNCTION ///////////////////////////////////////////
const TextFieldComponent = (props) => {
  // ////////////////////////////////////////////////////
  // RETURN /////////////////////////////////////////////
  console.log("レンダー（TextFieldComponent.jsx）");
  return (
    <>
      <TextField
        autoFocus={props.autoFocus}
        disabled={props.disabled}
        id="textInput"
        fullWidth={props.fullWidth}
        label={props.label}
        margin="dense"
        multiline={props.multiline}
        onKeyPress={props.handleEnterPress}
        rows={props.rows}
        variant={props.variant}
        //
        value={props.value}
        onChange={props.setValue}
      />
    </>
  );
};

export default React.memo(TextFieldComponent);
