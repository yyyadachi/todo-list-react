import React, { useContext } from "react";
import { ButtonComponent } from "./entryIndex";
// Contextをインポート
import { TodoTmpContext, TodoSavedContext, GlobalContext } from "../App";
// 独自関数をインポート
import { lookUp } from "./definedFunction";

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

// ////////////////////////////////////////////////////
// FUNCTION ///////////////////////////////////////////
const TodoList = (props) => {
  const classes = useStyles();
  const { todoTmpDispatch } = useContext(TodoTmpContext);
  const { todoSavedDispatch } = useContext(TodoSavedContext);
  const globalContextValue = useContext(GlobalContext);

  let secondaryText = [];

  // ////////////////////////////////////////////////////
  // RETURN /////////////////////////////////////////////
  return (
    <div className={classes.demo}>
      <List dense={true}>
        {/* **** ここからmap **** */}
        {props.todoListForDisplay.map((todo, index) => {
          return (
            <ListItem key={index.toString()}>
              <Grid container spacing={0}>
                <Grid item xs={1}>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                </Grid>
                <Grid item xs={11} md={7}>
                  <div style={{ display: "none" }}>
                    {/* secondaryTextの見通しを良くするために配列を作成 */}
                    {
                      (secondaryText = [
                        todo.todoDetail !== "" ? `${todo.todoDetail}\n` : "",
                        `(`,
                        `完了期日：${todo.deadline}`,
                        `重要度：${lookUp(
                          globalContextValue.selectImportanceElements,
                          "index",
                          todo.importanceIndex,
                          "text"
                        )}`,
                        `進捗：${lookUp(
                          globalContextValue.selectProgressElements,
                          "index",
                          todo.progressIndex,
                          "text"
                        )}`,
                        `ID：${todo.id}`,
                        `\n`,
                        props.filterValue === "complete"
                          ? `完了日：${todo.completeDate}`
                          : "",
                        props.filterValue !== "complete"
                          ? `更新日：${todo.updateDate}`
                          : "",
                        `作成日：${todo.createdDate}`,
                        `)`,
                      ])
                    }
                  </div>
                  <ListItemText
                    primary={todo.todoText}
                    secondary={secondaryText.join("　")}
                    style={{ whiteSpace: "pre-line" }} // 改行を有効にする
                  />
                </Grid>

                <Grid item>
                  <ButtonComponent
                    color="primary"
                    display={props.filterValue === "complete" ? "none" : ""}
                    icon={<PlaylistAddCheckIcon />}
                    size="small"
                    title="完了"
                    //
                    handleClick={() => {
                      todoSavedDispatch({
                        type: "doneTodo",
                        payload: todo.id,
                      });
                    }}
                  />
                </Grid>

                <Grid item>
                  <ButtonComponent
                    color="default"
                    display={props.filterValue === "complete" ? "none" : ""}
                    icon={<EditIcon />}
                    size="small"
                    title="編集"
                    //
                    handleClick={() => {
                      todoTmpDispatch({
                        type: "edit",
                        payload: todo,
                      });
                    }}
                  />
                </Grid>

                <Grid item>
                  <ButtonComponent
                    color="secondary"
                    display={props.filterValue === "complete" ? "none" : ""}
                    icon={<DeleteIcon />}
                    size="small"
                    title="削除"
                    //
                    handleClick={() => {
                      todoSavedDispatch({
                        type: "deleteTodo",
                        payload: todo.id,
                      });
                    }}
                  />
                </Grid>

                {/* 表示区分が未完了の場合のみ表示 */}
                <Grid item>
                  <ButtonComponent
                    color="secondary"
                    display={props.filterValue === "complete" ? "" : "none"}
                    icon={<RestoreIcon />}
                    size="small"
                    title="進行中に戻す"
                    //
                    handleClick={() => {
                      todoSavedDispatch({
                        type: "restoreTodo",
                        payload: todo.id,
                      });
                    }}
                  />
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
        {/* **** ここまでmap **** */}
      </List>
    </div>
  );
};

export default TodoList;
