import React, { useContext, useState } from "react";
import { ButtonComponent } from "./entryIndex";
// Contextをインポート
import { TodoTmpContext, TodoSavedContext, GlobalContext } from "../App";
// 独自関数をインポート
import { lookUp } from "./definedFunction";

// material-ui関連のインポート
import {
  Grid,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Hidden,
  Divider,
} from "@material-ui/core";
import WorkIcon from "@material-ui/icons/Work";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import RestoreIcon from "@material-ui/icons/Restore";

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

  //翌日（完了期日が明日以前のTODOを判定するため取得。アイコンの色を赤に）
  const today = new Date();
  const tomorrow = format(today.setDate(today.getDate() + 1), "yyyy-MM-dd");

  // ////////////////////////////////////////////////////
  // RETURN /////////////////////////////////////////////
  console.log("レンダー（TodoList.jsx）個別Todoデータの展開");
  return (
    <div className={classes.demo}>
      <List dense={true}>
        {/* **** ここからmap **** */}
        {(props.todoListForDisplay || []).map((todo, index) => {
          return (
            <ListItem key={index.toString()}>
              <Grid container>
                <Grid item xs={"auto"}>
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
                        primary={todo.todoText}
                        style={{ whiteSpace: "pre-line" }} // 改行を有効にする
                        //
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
                          todo.progressIndex === 4 // 進捗が4(完了)の場合のみ表示
                            ? `完了日：${todo.completeDate}`
                            : "",
                          todo.progressIndex !== 4
                            ? `更新日：${todo.updateDate}`
                            : "",
                          `作成日：${todo.createdDate}`,
                          `)`,
                        ].join("　")}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md style={{ minWidth: "270px" }}>
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
                  </Grid>
                </Grid>
                {/* 最後のtodoの下には区切り線を表示しない */}
                {index < props.todoListForDisplay.length - 1 && (
                  // {/* 画面幅sm(600px)以上の場合は区切り線を表示。としたかったが実際は960px以上で表示となっている */}
                  <Hidden smDown>
                    <Grid item xs={12}>
                      <Divider variant="middle" />
                    </Grid>
                  </Hidden>
                )}
              </Grid>
            </ListItem>
          );
        })}
        {/* **** ここまでmap **** */}
      </List>
    </div>
  );
};

export default React.memo(TodoList);
