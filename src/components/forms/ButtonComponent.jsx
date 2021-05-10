import React from "react";

// material-ui関連のインポート
import { makeStyles, Button } from "@material-ui/core";

// material-uiの設定
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

// ////////////////////////////////////////////////////
// FUNCTION ///////////////////////////////////////////
const ButtonComponent = (props) => {
  const classes = useStyles();

  // ////////////////////////////////////////////////////
  // RETURN /////////////////////////////////////////////
  console.log("レンダー（ButtonComponent.jsx");
  return (
    <div>
      {/* 指定しないpropsはdefault値となる。iconは非表示となる。 */}
      <Button
        className={classes.button}
        color={props.color}
        size={props.size}
        startIcon={props.icon}
        style={{ display: props.display }}
        variant="contained"
        //
        onClick={props.handleClick}
      >
        {props.title}
      </Button>
    </div>
  );
};

export default ButtonComponent;
