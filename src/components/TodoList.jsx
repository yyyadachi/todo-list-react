import React, { useContext } from "react";
import { ButtonComponent } from "./index";
// TodoStateContextをインポート
import { TodoStateContext } from "../App";

// material-ui関連のインポート
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import WorkIcon from "@material-ui/icons/Work";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const TodoList = () => {
  const classes = useStyles();
  // TodoStateContext.todoStateの値を変数に分割代入
  const { todoState } = useContext(TodoStateContext);

  return (
    <div className={classes.demo}>
      <List dense={true}>
        {todoState.map((todo, index) => {
          return (
            <ListItem key={index.toString()}>
              <Grid container spacing={0}>
                <Grid item xs={1}>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                </Grid>
                <Grid item xs={11} md={7}>
                  <ListItemText
                    primary={todo.summary}
                    secondary={todo.detail ? todo.detail : null}
                  />
                </Grid>

                <Grid item>
                  <ButtonComponent
                    title="完了"
                    color="primary"
                    icon={<PlaylistAddCheckIcon />}
                    size="small"
                    action={"doneTodo"}
                  />
                </Grid>
                <Grid item>
                  <ButtonComponent
                    title="編集"
                    color="default"
                    icon={<EditIcon />}
                    size="small"
                    handleClick={() => {
                      alert("Open Modal");
                    }} // stateを変更しないボタンは関数を渡す
                    isNew={false}
                  />
                </Grid>
                <Grid item>
                  <ButtonComponent
                    title="削除"
                    color="secondary"
                    icon={<DeleteIcon />}
                    size="small"
                    action={"deleteTodo"}
                  />
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default TodoList;
