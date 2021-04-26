import React from "react";
import { RadioComponent, TodoList } from "./index";

//TODO Gridを適用する
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
    <div>
      <RadioComponent
        title={"ソート"}
        elements={radioElementsTwo}
        style={{ marginRight: "8px" }} //効果なし
      />
      <RadioComponent title={"表示切替"} elements={radioElements} />
      <TodoList />
    </div>
  );
};

export default TodoLists;
