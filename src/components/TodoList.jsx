import React, { useContext, useState } from "react";
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
// import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: "#f6685e",
  },
}));

// ////////////////////////////////////////////////////
// FUNCTION ///////////////////////////////////////////
const TodoList = (props) => {
  const classes = useStyles();
  const { todoTmpDispatch } = useContext(TodoTmpContext);
  const { todoSavedDispatch } = useContext(TodoSavedContext);
  const globalContextValue = useContext(GlobalContext);

  // Confirm用メニュー表示のためのStateおよび関数
  const [anchorEl, setAnchorEl] = useState(null);
  // Confirm用メニューにmapのtodoデータ（削除対象のID）が引き継がれなかったため設定
  const [delateId, setDelateId] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  //明日（完了期日が明日以前のTODOを判定するため取得。アイコンの色を赤に）
  const today = new Date();
  const tomorrow = format(today.setDate(today.getDate() + 1), "yyyy-MM-dd");

  // ////////////////////////////////////////////////////
  // RETURN /////////////////////////////////////////////
  return (
    <div className={classes.demo}>
      <List dense={true}>
        {/* **** ここからmap **** */}
        {(props.todoListForDisplay || []).map((todo, index) => {
          return (
            <ListItem key={index.toString()}>
              <Grid container>
                <Grid item xs={0}>
                  <Grid container>
                    <Grid item>
                      <ListItemIcon>
                        <WorkIcon
                          className={
                            todo.progressIndex !== 4 &&
                            todo.deadline <= tomorrow
                              ? classes.icon
                              : ""
                          }
                        />
                      </ListItemIcon>
                    </Grid>
                    <Grid item xs>
                      <ListItemText
                        style={{ whiteSpace: "pre-line" }} // 改行を有効にする
                        primary={todo.todoText}
                        secondary={[
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
                        ].join("　")}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <ButtonComponent
                        color="primary"
                        display={todo.progressIndex === 4 ? "none" : ""}
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
                        display={todo.progressIndex === 4 ? "none" : ""}
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
                        display={todo.progressIndex === 4 ? "none" : ""}
                        icon={<DeleteIcon />}
                        size="small"
                        title="削除"
                        //

                        handleClick={(event) => {
                          setDelateId(todo.id);
                          setAnchorEl(event.currentTarget);
                        }}
                      />
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose}>キャンセル</MenuItem>
                        <MenuItem
                          onClick={() => {
                            todoSavedDispatch({
                              type: "deleteTodo",
                              payload: delateId,
                            });
                            // console.log(JSON.stringify(todo, null, 2));
                            handleClose();
                          }}
                        >
                          削除する!
                        </MenuItem>
                      </Menu>
                    </Grid>
                    {/* 表示区分が未完了の場合のみ表示 */}
                    <Grid item>
                      <ButtonComponent
                        color="secondary"
                        display={todo.progressIndex === 4 ? "" : "none"}
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
                  </Grid>{" "}
                  {/* Grid container */}
                </Grid>
                {/* 最後のtodoの下には区切り線を表示しない */}
                {index < props.todoListForDisplay.length - 1 && (
                  <Grid item xs={12}>
                    {/* 画面幅sm(600px)以上の場合は区切り線を表示 */}
                    <Box display={{ xs: "none", sm: "block" }}>
                      <Divider variant="middle" />
                    </Box>
                  </Grid>
                )}
              </Grid>
            </ListItem>
          );
        })}
        {/* **** ここまでmap **** */}
      </List>
      {console.log("render: TodoList.jsx（詳細データ）")}
    </div>
  );
};

export default TodoList;
