import React, { useContext } from "react";
// Contextをインポート
import { TodoSavedContext } from "../../App";
import { TodoTmpContext } from "../../App";

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
  const { todoSavedDispatch } = useContext(TodoSavedContext);
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
        // variant={props.variant}
        onClick={props.handleClick}
        //   props.action
        //     ? () => {
        //         todoSavedDispatch({
        //           type: props.action,
        //           payload: props.payload,
        //         });
        //       }
        //     : () => props.handleClick(props.id) // 関数を実行せず引数を渡す
        // }
      >
        {props.title}
      </Button>
    </div>
  );
};

export default ButtonComponent;
