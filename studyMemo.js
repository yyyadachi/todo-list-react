// ///////////////////////////////////////////////
// useContext ////////////////////////////////////
// ///////////////////////////////////////////////

// <<<< Parent側 >>>>
// createContextをインポート
import React, { createContext, useState } from "react";
import { ChildComponent } from "./component/index";

// contextを作成しexport
export const AaaContext = createContext();

const Parent = () => {
  const [value, setValue] = useState({ valueOne: "a", valueTwo: "b" });
  return (
    <div>
      {/* Providerでラップ */}
      <AaaContext.Provider value={value}>
        <ChildComponent />
      </AaaContext.Provider>
    </div>
  );
};

export default Parent;

// <<<< Child側 >>>>
// useContextをインポート
import React, { useContext } from "react";
// contextをインポート
import { AaaContext } from "../Parent";

const ChildComponent = () => {
  // Providerで渡したvalueの値を変数に代入
  const value = useContext(AaaContext);
  return (
    <div>
      {value.valueOne.map((valueOneElement, index) => {
        return <p key={index.toString()}>{valueOneElement}</p>;
      })}
    </div>
  );
};

export default ChildComponent;

// ///////////////////////////////////////////////
// useReducer（state複数） ////////////////////////////////////
// ///////////////////////////////////////////////

// useReducerをインポート
import React, { useReducer } from "react";

// 初期値をセット
const initialState = { value1: "初期値1", value2: "初期値2" };

// reducer関数を作成
const reducer = (bbbState, action) => {
  switch (action.type) {
    case "アクション名":
      // 複数のstateを持つため、最初に更新前の値を展開してから該当valueの値を更新
      return { ...bbbState, value1: bbbState.value1 + action.payload };
    default:
      return bbbState;
  }
};

const ReducerFunc = () => {
  // useReducerに作成したreducer関数とinitialStateを渡す
  // useReducerから返ってきたbbbStateとdispatchを分割代入
  // dispatchはアクション名に対応した値・関数？
  const [bbbState, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <button onClick={() => dispatch({ type: "アクション名", payload: "値" })}>
        ボタンtext
      </button>
    </>
  );
};

export default ReducerFunc;

// ///////////////////////////////////////////////
// useContext + useReducer ////////////////////////////////////
// ///////////////////////////////////////////////

// <<<< Parent側 >>>>
// useReducer,createContextをインポート
import React, { useReducer, createContext } from "react";

// contextを作成しexport
export const CccContext = createContext();

// 初期値をセット
const initialState = { value1: "初期値1", value2: "初期値2" };

// reducer関数を作成
const ParentReducer = (dddState, action) => {
  switch (action.type) {
    case "アクション名":
      // 複数のstateを持つため、最初に更新前の価を展開してから該当valueの値を更新
      return { ...dddState, value1: dddState.value1 + action.payload };
    default:
      return dddState;
  }
};

const Parent = () => {
  // useReducerに作成したreducer関数とinitialStateを渡す
  // useReducerから返ってきたdddStateとdispatchを分割代入
  const [dddState, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      {/* Providerでラップ （valueに同じ名前のオブジェクトを引き渡している）*/}
      <CccContext.Provider value={{ dddState, dispatch }}>
        <ChildComponent />
      </CccContext.Provider>
    </div>
  );
};

export default ParentReducer;

// <<<< Child側 >>>>
// useContextをインポート
import React, { useContext } from "react";
// contextをインポート
import { CccContext } from "../ParentReducer";

const ChildReducer = () => {
  // Providerで渡したvalueの値を変数に代入
  const { dddState, dispatch } = useContext(CccContext);
  return (
    <>
      {dddState.value1.map((value1Element, index) => {
        return (
          <>
            <button
              key={index.toString()}
              onClick={() => dispatch({ type: "アクション名", payload: "値" })}
            >
              ボタンtext
            </button>
            <p>{value1Element}</p>
          </>
        );
      })}
    </>
  );
};

export default ChildReducer;
// ///////////////////////////////////////////////
// カスタムフック
