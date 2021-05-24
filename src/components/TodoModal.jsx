import React, { useContext } from "react";
import { TodoSavedContext, TodoTmpContext, GlobalContext } from "../App";
import {
  ButtonComponent,
  DatePickerComponent,
  SelectComponent,
  TextFieldComponent,
} from "./entryIndex";

// material-ui関連のインポート
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
} from "@material-ui/core";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

// import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

// ////////////////////////////////////////////////////
// FUNCTION ///////////////////////////////////////////
const TodoModal = (props) => {
  // Contextの値を取得
  const { todoTmpState, todoTmpDispatch } = useContext(TodoTmpContext);
  const { todoSavedDispatch } = useContext(TodoSavedContext);
  const globalValue = useContext(GlobalContext);

  const classes = useStyles();

  // IDの有無で新規入力（詳細）か編集かを判定
  const isNew = todoTmpState.tmpId === null;

  // ////////////////////////////////////////////////////
  // RETURN /////////////////////////////////////////////
  console.log("レンダー（TodoModal.jsx）");
  return (
    <Dialog
      open={true} // このプロパティでも表示・非表示を制御できる。今回App側で制御。
      // onClose={handleClose} // ダイアログ外クリックで非表示としない
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
              // setSelectedDate={(date) => {
              //   todoTmpDispatch({
              //     type: "handleChange",
              //     payload: {
              //       key: "tmpDeadline",
              //       value: format(date, "yyyy-MM-dd"),
              //     },
              //   });
              // }}
              setSelectedDate={todoTmpDispatch}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectComponent
              elements={globalValue.selectImportanceElements}
              helperText={"重要度：高5→低1"}
              label={"重要度"}
              //
              selectValue={todoTmpState.tmpImportanceIndex}
              // setSelectValue={(e) => {
              //   todoTmpDispatch({
              //     type: "handleChange",
              //     payload: {
              //       key: "tmpImportanceIndex",
              //       value: e.target.value,
              //     },
              //   });
              // }}
              setSelectValue={todoTmpDispatch}
              selectKey={"tmpImportanceIndex"}
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
              // setSelectValue={(e) => {
              //   todoTmpDispatch({
              //     type: "handleChange",
              //     payload: {
              //       key: "tmpProgressIndex",
              //       value: e.target.value,
              //     },
              //   });
              // }}
              setSelectValue={todoTmpDispatch}
              selectKey={"tmpProgressIndex"}
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
  );
};

export default TodoModal;
