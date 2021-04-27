import React from "react";
import { RadioComponent, TodoList } from "./index";
import Grid from "@material-ui/core/Grid";

const TodoLists = () => {
  const radioElements = [
    { label: "未完了", color: "secondary" },
    { label: "完了" },
  ];
  const radioElementsTwo = [
    { label: "登録順" },
    { label: "期日順" },
    { label: "重要度順" },
    { label: "更新日順" },
  ];
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <RadioComponent title={"ソート"} elements={radioElementsTwo} />
        </Grid>
        <Grid item xs={12} md={6}>
          <RadioComponent title={"表示切替"} elements={radioElements} />
        </Grid>
      </Grid>
      <TodoList />
    </>
  );
};

export default TodoLists;
