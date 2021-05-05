import React, { useState, useContext, useEffect } from "react";
import { RadioComponent, TodoList } from "./entryIndex";

// TodoStateContextをインポート
import { TodoSavedContext } from "../App";

// material-ui関連のインポート
import Grid from "@material-ui/core/Grid";

// ////////////////////////////////////////////////////
// ////////////////////////////////////////////////////
// FUNCTION ///////////////////////////////////////////
const TodoLists = () => {
  const { todoSavedState } = useContext(TodoSavedContext);

  // ////////////////////////////////////////////////////
  // 表示の状態（filter,sort）を管理するstate どちらかを変更した時、もう一方も参照して表示用のTodo一覧を作成するため
  const [sortValue, setSortValue] = useState("id");
  const [filterValue, setFilterValue] = useState("incomplete");
  // 画面表示用のtodoリストを作成・state管理 変更毎に再描画するため
  const [todoListForDisplay, setTodoListForDisplay] = useState(todoSavedState);

  // ////////////////////////////////////////////////////
  // radioボタン項目（ソート）
  const sortRadioElements = [
    { value: "id", label: "登録順" },
    { value: "deadline", label: "期日順" },
    { value: "importanceIndex", label: "重要度順" },
    {
      value: "updateDate",
      label: "更新日順",
      disabled: filterValue === "complete", // 完了選択の時disabled
    },
    {
      value: "completeDate",
      label: "完了日順",
      disabled: filterValue === "incomplete", // 未完了選択の時disabled
    },
  ];

  // radioボタン項目（表示区分）
  const doneRadioElements = [
    { value: "incomplete", label: "未完了", color: "secondary" },
    { value: "complete", label: "完了" },
  ];

  // ////////////////////////////////////////////////////
  // 初回およびstate(filterValue、sortValue、todoState（Todoデータ本体）)が変更された場合にstate(todoListForDisplay)を更新する。

  useEffect(() => {
    // 更新日順を選択している状態で完了表示とした場合、および完了日順を選択している状態で未完了表示とした場合ソートを登録順(id)とする。
    if (filterValue === "complete" && sortValue === "updateDate")
      setSortValue("id");
    if (filterValue === "incomplete" && sortValue === "completeDate")
      setSortValue("id");

    // 実行時の選択状態でfilter→sortを行う。
    const newDisplay = todoSavedState
      .filter((todo) => {
        return filterValue === "incomplete"
          ? todo.progressIndex !== 4
          : todo.progressIndex === 4;
      })
      .slice()
      .sort((a, b) => {
        if (a[sortValue] < b[sortValue]) {
          return 1;
        } else {
          return -1;
        }
      });
    setTodoListForDisplay(newDisplay);
    // console.log(
    //   "filter,sort済み表示用データ：" + JSON.stringify(todoListForDisplay)
    // );
    // ↑のconsole.logは変更前のデータが出力される。。。

    console.log("TodoLists.jsx useEffect作動");
  }, [sortValue, filterValue, todoSavedState]);
  // });
  // ↑第二引数を指定しないとuseEffectが無限連鎖になっている。

  // ////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////
  // RETURN
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <RadioComponent
            title={"ソート（すべて降順）"}
            name={"sortRadioGroup"}
            elements={sortRadioElements}
            radioValue={sortValue}
            setRadioValue={setSortValue}
          />
          {/* {console.log("render:TodoLists.jsx RadioComponent(ソート)")} */}
        </Grid>
        <Grid item xs={12} md={4}>
          <RadioComponent
            title={"表示切替"}
            name={"FilterRadioGroup"}
            elements={doneRadioElements}
            radioValue={filterValue}
            setRadioValue={setFilterValue}
          />
          {/* {console.log("render:TodoLists.jsx RadioComponent(表示切替)")} */}
        </Grid>
      </Grid>
      <TodoList
        filterValue={filterValue} // 表示区分によってボタンの表示を切り替える
        todoListForDisplay={todoListForDisplay} // 画面表示用Todoリスト
      />
      {console.log("render:TodoLists.jsx")}
    </>
  );
};

export default TodoLists;
