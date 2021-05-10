// //////////////////////////////////////////////////
// ユーザー定義関数を作成 ///////////////////////////

// //////////////////////////////////////////////////
// オブジェクトから、keyの値がvalueであるデータのreturnKeyの値を返す

export const lookUp = (obj, key, value, returnKey) => {
  const returnValue = obj.filter((item) => item[key] === value)[0][returnKey];
  return returnValue;
};
