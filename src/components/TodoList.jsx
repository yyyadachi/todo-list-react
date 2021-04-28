import React from "react";
import { ButtonComponent } from "./index";

// material-ui関連のインポート
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import WorkIcon from "@material-ui/icons/Work";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import RestoreIcon from "@material-ui/icons/Restore";

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const TodoList = (props) => {
  const classes = useStyles();
  // TodoStateContext.todoStateの値を変数に分割代入
  // const { todoState } = useContext(TodoStateContext);

  return (
    <div className={classes.demo}>
      <List dense={true}>
        {props.todoListForDisplay.map((todo, index) => {
          // console.log("render");
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
                    primary={todo.todoText}
                    secondary={`${
                      todo.todoDetail ? todo.todoDetail + "\n" : ""
                    }（${
                      props.filterValue === "complete"
                        ? "完了日：" + todo.completeDate + "　"
                        : ""
                    }完了期日：${todo.deadline}　重要度：${
                      todo.importance
                    }　進捗：${todo.progress}　ID：${todo.id}）`}
                    style={{ whiteSpace: "pre-line" }} // 改行を有効にする
                  />
                </Grid>

                <Grid item>
                  <ButtonComponent
                    title="完了"
                    color="primary"
                    icon={<PlaylistAddCheckIcon />}
                    size="small"
                    action={"doneTodo"}
                    display={props.filterValue === "complete" ? "none" : ""}
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
                    display={props.filterValue === "complete" ? "none" : ""}
                  />
                </Grid>
                <Grid item>
                  <ButtonComponent
                    title="削除"
                    color="secondary"
                    icon={<DeleteIcon />}
                    size="small"
                    action={"deleteTodo"}
                    display={props.filterValue === "complete" ? "none" : ""}
                  />
                </Grid>
                {/* 表示区分が未完了の場合のみ表示 */}
                <Grid item>
                  <ButtonComponent
                    title="未完了に戻す"
                    color="secondary"
                    icon={<RestoreIcon />}
                    size="small"
                    action={"restoreTodo"}
                    display={props.filterValue === "complete" ? "" : "none"}
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
