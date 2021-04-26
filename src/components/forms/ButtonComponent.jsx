import React, { useContext } from "react";

// material-ui関連のインポート
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// AppからTodosContextをインポート
import { TodosContext } from "../../App";

// material-uiの設定
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const ButtonComponent = (props) => {
  const classes = useStyles();
  const { todosDispatch } = useContext(TodosContext);
  return (
    <div>
      {/* buttonのpropsは指定しなければdefault値となる。iconは非表示となる。 */}
      <Button
        className={classes.button}
        variant="contained"
        color={props.color}
        startIcon={props.icon}
        size={props.size}
        onClick={() => todosDispatch(props.action)}
      >
        {props.title}
      </Button>
    </div>
  );
};

export default ButtonComponent;
