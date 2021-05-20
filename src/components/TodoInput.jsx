import React, { useContext } from "react";
// contextをインポート
import { TodoSavedContext, TodoTmpContext, GlobalContext } from "../App";
// コンポーネントをインポート
import {
  ButtonComponent,
  DatePickerComponent,
  TextFieldComponent,
  SelectComponent,
} from "./entryIndex";

// material-ui関連のインポート
import { makeStyles, Grid } from "@material-ui/core";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import DescriptionIcon from "@material-ui/icons/Description";
// date-fnsをインポート
import { format } from "date-fns";

// ////////////////////////////////////////////////////
// material-uiの設定
const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(2),
    alignItems: "center",
  },
}));

// ////////////////////////////////////////////////////
// FUNCTION ///////////////////////////////////////////
const TodoInput = () => {
  const classes = useStyles();

  // Contextの値を取得
  const { todoSavedDispatch } = useContext(TodoSavedContext);
  const { todoTmpState, todoTmpDispatch } = useContext(TodoTmpContext);
  const { selectImportanceElements } = useContext(GlobalContext);

  // ////////////////////////////////////////////////////
  // RETURN /////////////////////////////////////////////
  console.log("レンダー（TodoInput.jsx）");
  return (
    <div style={{ marginTop: "10px" }}>
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <TextFieldComponent
            autoFocus={true}
            fullWidth={true}
            label={"Todoを入力"}
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
        <Grid item xs={6} sm>
          <DatePickerComponent
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
        <Grid item xs={6} sm>
          <SelectComponent
            elements={selectImportanceElements}
            helperText={"重要度：高5→低1"}
            label={"重要度"}
            //
            selectValue={todoTmpState.tmpImportanceIndex}
            setSelectValue={(e) => {
              todoTmpDispatch({
                type: "handleChange",
                payload: { key: "tmpImportanceIndex", value: e.target.value },
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container justify="flex-end">
            <Grid item>
              <ButtonComponent
                color="primary"
                icon={<PlaylistAddIcon />}
                title="ToDo追加"
                //
                handleClick={async () => {
                  await todoSavedDispatch({
                    type: "addUpdate",
                    payload: todoTmpState,
                  });
                  todoTmpDispatch({
                    type: "reset",
                  });
                }}
              />
            </Grid>
            <Grid item>
              <ButtonComponent
                icon={<DescriptionIcon />}
                title={"詳細入力"}
                //
                handleClick={() => {
                  todoTmpDispatch({
                    type: "new",
                  });
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default TodoInput;
