import React, { useContext } from "react";
// TodoStateContextをインポート
import { TodoStateContext } from "../../App";

// material-ui関連のインポート
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// material-uiの設定
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const ButtonComponent = (props) => {
  const classes = useStyles();
  const { todoDispatch } = useContext(TodoStateContext);
  return (
    <div>
      {/* buttonのpropsは指定しなければdefault値となる。iconは非表示となる。 */}
      <Button
        className={classes.button}
        variant="contained"
        color={props.color}
        startIcon={props.icon}
        size={props.size}
        onClick={
          props.action
            ? () => {
                todoDispatch(props.action);
              }
            : props.handleClick
        }
      >
        {props.title}
      </Button>
    </div>
  );
};

export default ButtonComponent;
