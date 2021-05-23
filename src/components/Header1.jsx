// 1 memoつけないと親がレンダーされるとレンダーされる。最終行の export default memo(Header1); でOK
// 2

import React, { memo } from "react";

import { makeStyles, Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

// ////////////////////////////////////////////////////
// FUNCTION ///////////////////////////////////////////
const Header1 = () => {
  const classes = useStyles(); //←この記述がはいると毎回レンダーされる？

  // ////////////////////////////////////////////////////
  // RETURN /////////////////////////////////////////////
  console.log("レンダー（header1.jsx）ここの再描画を制御したい");
  return (
    <>
      <Typography variant="h5" className={classes.title}>
        Header1です
      </Typography>
    </>
  );
};

export default memo(Header1);
