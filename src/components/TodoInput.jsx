import React, { useState } from "react";

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
    padding: theme.spacing(2),
    direction: "row",
    justify: "flex-start",
    alignItems: "center",
  },
}));

const TodoInput = () => {
  const classes = useStyles();

  // 入力データをuseStateに設定
  const [summary, setSummary] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [importance, setImportance] = useState("");

  // 重要度selectボックスの値
  const selectElements = [
    { value: 1, text: "1(低)" },
    { value: 2, text: "2" },
    { value: 3, text: "3" },
    { value: 4, text: "4" },
    { value: 5, text: "5(高)" },
  ];

  return (
    <React.Fragment>
      <Grid container className={classes.grid}>
        <Grid item xs={12} md={10}>
          <TextInputComponent
            label={"Todoを入力"}
            isFullWidth={true}
            value={summary}
            setValue={setSummary}
          />
          <p>{summary}</p>
        </Grid>
        <Grid item xs={12} md={2} style={{ textAlign: "right" }} zeroMinWidth>
          <ButtonComponent
            title={"詳細(未)"}
            icon={<DescriptionIcon />}
            action={"openModal"}
            isNew={true}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <DatePickerComponent
            //interval={3} //入力日から完了期日までの日数
            label={"完了期日"}
            selectedDate={deadline}
            setSelectedDate={setDeadline}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <SelectComponent
            label={"重要度"}
            elements={selectElements}
            initialValue={3}
            helperText={"重要度：高5→低1"}
            selectValue={importance}
            setSelectValue={setImportance}
          />
        </Grid>
        <Grid item xs={12} sm={4} style={{ textAlign: "right" }}>
          <ButtonComponent
            title="ToDo追加"
            color="primary"
            icon={<PlaylistAddIcon />}
            size="large"
            action={"addTodo"}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default TodoInput;
