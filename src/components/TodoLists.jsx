import React, { useState, useContext, useEffect } from "react";
import {
  RadioComponent,
  TodoList,
  TextFieldComponent,
  ButtonComponent,
} from "./entryIndex";

// TodoStateContextをインポート
import { TodoSavedContext } from "../App";

// material-ui関連のインポート
import Grid from "@material-ui/core/Grid";
// import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
// import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SearchIcon from "@material-ui/icons/Search";

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
  // トランジションの切り替えに利用
  const [checked, setChecked] = useState(false);
  // 検索の値を格納
  const [searchValue, setSearchValue] = useState("");

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  // ////////////////////////////////////////////////////
  // radioボタン項目（ソート）
  const sortRadioElements = [
    { value: "id", label: "登録順" },
    { value: "deadline", label: "期日順" },
    { value: "importanceIndex", label: "重要度順" },
    {
      value: "updateDate",
      label: "更新日順",
      disabled: filterValue === "complete", // 完了選択時disabled
    },
    {
      value: "completeDate",
      label: "完了日順",
      disabled: filterValue === "incomplete" || filterValue === null, // 未完了選択時および検索時（nul）disabled
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

    // filterValueおよびsortValueが共にnullの時（検索実行時）は何もしない。
    if (filterValue === null && sortValue === null) {
      return;
    } else if (todoSavedState === null) {
      setTodoListForDisplay([]);
      return;
    } else {
      // filterValue、sortValueどちらかがnullの時（検索の直後）はnullの方に値をいれて実行。
      filterValue === null && setFilterValue("incomplete");
      sortValue === null && setSortValue("id");
      // 検索値クリア
      setSearchValue("");

      // 実行時の選択状態でfilter→sortを行う。
      const newDisplay = [...todoSavedState]
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
    }
    console.log("TodoLists.jsx useEffect（todoListForDisplay作成）");
  }, [sortValue, filterValue, todoSavedState]);
  // ↑第二引数を指定しないとuseEffectが無限ループになっている。

  // 確認用console.log
  useEffect(() => {
    // console.log(
    //   "保存リストが変わったよ" + JSON.stringify(todoSavedState, null, 2)
    // );
    console.log("保存リストが変わったよ!");
  }, [todoSavedState]);

  useEffect(() => {
    // console.log(
    //   "表示用リストが変わったよ" + JSON.stringify(todoListForDisplay, null, 2)
    // );
    console.log("表示用リストが変わったよ");
  }, [todoListForDisplay]);

  const doSearch = () => {
    const searchDisplay = todoSavedState.filter((todo) => {
      return (
        todo.todoText.includes(searchValue) ||
        todo.todoDetail.includes(searchValue)
      );
    });
    setSortValue(null);
    setFilterValue(null);
    setTodoListForDisplay(searchDisplay);
  };

  // ////////////////////////////////////////////////////
  // RETURN
  return (
    <>
      <Grid container spacing={2} style={{ marginBottom: "4px" }}>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <h2>TODO一覧</h2>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="表示条件"
              />
            </Grid>
          </Grid>
        </Grid>
        <Collapse in={checked}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <RadioComponent
                title={"ソート（すべて降順）"}
                name={"sortRadioGroup"}
                elements={sortRadioElements}
                radioValue={sortValue}
                setRadioValue={setSortValue}
              />
              {/* {console.log("render:TodoLists.jsx RadioComponent(ソート)")} */}
            </Grid>
            <Grid item>
              <RadioComponent
                title={"表示切替"}
                name={"FilterRadioGroup"}
                elements={doneRadioElements}
                radioValue={filterValue}
                setRadioValue={setFilterValue}
              />
              {/* {console.log("render:TodoLists.jsx RadioComponent(表示切替)")} */}
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={8}>
                  <TextFieldComponent
                    fullWidth={true}
                    label={"Search todos…"}
                    variant={"outlined"}
                    //
                    value={searchValue}
                    setValue={(e) => setSearchValue(e.target.value)}
                  />
                </Grid>
                <Grid item xs>
                  <ButtonComponent
                    color="default"
                    icon={<SearchIcon />}
                    size="small"
                    title="検索"
                    //
                    handleClick={doSearch}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Collapse>
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
