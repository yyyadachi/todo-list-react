import React, { useState, useContext, useReducer } from "react";
import {
  TodoSavedContext,
  TodoTmpContext,
  // TodoModalContext,
  GlobalContext,
} from "../App";
import {
  TextFieldComponent,
  ButtonComponent,
  DatePickerComponent,
  SelectComponent,
} from "./entryIndex";
// import lookUp from "./definedFunction";

// material-ui関連のインポート
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";

import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

// ////////////////////////////////////////////////////
// FUNCTION ///////////////////////////////////////////
const TodoModal = (props) => {
  // TodoTmpContextを変数に代入
  const { todoTmpState, todoTmpDispatch } = useContext(TodoTmpContext);
  const { todoSavedDispatch } = useContext(TodoSavedContext);
  const globalValue = useContext(GlobalContext);

  // 編集用のstateを設定(初期値は新規入力時)
  // const [editId, setEditId] = useState(null);
  // const [editTodoText, setEditTodoText] = useState("");
  // const [editTodoDetail, setEditTodoDetail] = useState("");
  // const [editImportanceIndex, setEditImportanceIndex] = useState(null);
  // const [editProgressIndex, setEditProgressIndex] = useState(null);
  // const [editCreatedDate, setEditCreatedDate] = useState(null);
  // const [editUpdateDate, setEditUpdateDate] = useState(null);

  const classes = useStyles();

  // 新規入力（詳細）か編集かを判定
  const isNew = todoTmpState.tmpId === null;

  // const handleClose = () => {
  //   todoTmpDispatch({
  //     type: "cancel",
  //   });
  // };

  // const handleDone = () => {
  //   todoTmpDispatch({
  //     type: "done",
  //     // payload: todoTmpState,
  //   });
  // };

  // ////////////////////////////////////////////////////
  // RETURN /////////////////////////////////////////////
  return (
    <div>
      <Dialog
        open={true} // 本来このプロパティで表示・非表示を制御できるが、非表示時の描画を無くせるためApp.jsx側で制御した
        // onClose={handleClose} // ダイアログ外クリックで非表示はしない
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Todo詳細</DialogTitle>
        <DialogContent>
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={4}>
              <TextFieldComponent
                disabled={true}
                label={isNew ? "ID(自動)" : "ID"}
                value={todoTmpState.tmpId}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldComponent
                fullWidth={true}
                label="Todo"
                multiline={true}
                variant={"outlined"}
                //
                value={todoTmpState.tmpTodoText}
                setValue={(e) => {
                  todoTmpDispatch({
                    type: "handleChange",
                    payload: { key: "tmpTodoText", value: e.target.value },
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldComponent
                fullWidth
                label="Todo詳細"
                multiline={true}
                rows={2}
                variant={"outlined"}
                //
                value={todoTmpState.tmpTodoDetail}
                setValue={(e) => {
                  todoTmpDispatch({
                    type: "handleChange",
                    payload: { key: "tmpTodoDetail", value: e.target.value },
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePickerComponent
                isEdit={props.isEdit}
                label={"完了期日"}
                //
                selectedDate={todoTmpState.tmpDeadline}
                setSelectedDate={(date) => {
                  todoTmpDispatch({
                    type: "handleChange",
                    payload: {
                      key: "tmpDeadline",
                      value: format(date, "yyyy-MM-dd"),
                    },
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectComponent
                elements={globalValue.selectImportanceElements}
                helperText={"重要度：高5→低1"}
                label={"重要度"}
                //
                selectValue={todoTmpState.tmpImportanceIndex}
                setSelectValue={(e) => {
                  todoTmpDispatch({
                    type: "handleChange",
                    payload: {
                      key: "tmpImportanceIndex",
                      value: e.target.value,
                    },
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectComponent
                // 選択に完了を表示しない
                elements={globalValue.selectProgressElements.filter(
                  (element) => element.text !== "完了"
                )}
                helperText={"完了は元画面のボタンをクリック"}
                label={"進捗"}
                //
                selectValue={todoTmpState.tmpProgressIndex}
                setSelectValue={(e) => {
                  todoTmpDispatch({
                    type: "handleChange",
                    payload: {
                      key: "tmpProgressIndex",
                      value: e.target.value,
                    },
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFieldComponent
                disabled={true}
                label={"更新日（自動）"}
                value={todoTmpState.tmpUpdateDate}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFieldComponent
                disabled={true}
                label={"作成日（自動）"}
                value={todoTmpState.tmpCreatedDate}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>キャンセル</Button>
          <Button color="primary" onClick={handleDone}>
            確定する
          </Button> */}
          <ButtonComponent
            icon={<CancelPresentationIcon />}
            size="small"
            title="キャンセル"
            //
            handleClick={() => {
              todoTmpDispatch({
                type: "cancel",
              });
            }}
          />
          <ButtonComponent
            color="primary"
            icon={<CheckCircleOutlineIcon />}
            size="small"
            title="確定する"
            //
            handleClick={async () => {
              todoSavedDispatch({
                type: "addUpdate",
                payload: todoTmpState,
              });
              await todoTmpDispatch({
                type: "reset",
              });
            }}
          />
        </DialogActions>
      </Dialog>
      {console.log("render: TodoModal.jsx")}
    </div>
  );
};

export default TodoModal;
