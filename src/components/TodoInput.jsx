import React, { useContext } from "react";
// TodoTmpContextをインポート
import { TodoTmpContext } from "../App";

// material-ui関連のインポート
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  TextInputComponent,
  ButtonComponent,
  DatePickerComponent,
  SelectComponent,
} from "./index";
// buttonコンポーネントに渡すアイコンをインポート
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import DescriptionIcon from "@material-ui/icons/Description";

// material-uiの設定
const useStyles = makeStyles((theme) => ({
  grid: {
    flexGrow: 1,
    padding: theme.spacing(1),
    direction: "row",
    justify: "flex-start",
    alignItems: "center",
  },
}));

const TodoInput = () => {
  const classes = useStyles();

  // TodoTmpContextの値を変数に代入
  const todoTmpValue = useContext(TodoTmpContext);

  // 重要度selectボックスの値
  const selectElements = [
    { value: 1, text: "1(低)" },
    { value: 2, text: "2" },
    { value: 3, text: "3" },
    { value: 4, text: "4" },
    { value: 5, text: "5(高)" },
  ];

  return (
    <div style={{ marginTop: "10px" }}>
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <TextInputComponent
            label={"Todoを入力"}
            isFullWidth={true}
            value={todoTmpValue.todoText}
            setValue={todoTmpValue.setTodoText}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <DatePickerComponent
            interval={3} //入力日から完了期日までの日数
            label={"完了期日"}
            selectedDate={todoTmpValue.deadline}
            setSelectedDate={todoTmpValue.setDeadline}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <SelectComponent
            label={"重要度"}
            elements={selectElements}
            initialValue={3}
            helperText={"重要度：高5→低1"}
            selectValue={todoTmpValue.importance}
            setSelectValue={todoTmpValue.setImportance}
          />
        </Grid>
        <Grid item>
          <ButtonComponent
            title="ToDo追加"
            color="primary"
            icon={<PlaylistAddIcon />}
            // size="large"
            action={"addTodo"}
          />
        </Grid>
        <Grid item>
          <ButtonComponent
            title={"詳細入力"}
            icon={<DescriptionIcon />}
            handleClick={() => {
              alert("Open Modal");
            }} // stateを変更しないボタンは関数を渡す
            isNew={true}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default TodoInput;
