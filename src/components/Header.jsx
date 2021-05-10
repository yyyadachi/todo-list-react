import React, { useContext } from "react";
import { TodoSavedContext } from "../App";

// material-ui関連のインポート
import {
  AppBar,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import ListAltIcon from "@material-ui/icons/ListAlt";
import SettingsIcon from "@material-ui/icons/Settings";

//ヘッダーをスライドさせる
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

//スイッチボタンを右に配置///////////////////////
const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

// ////////////////////////////////////////////////////
// FUNCTION ///////////////////////////////////////////
const Header = (props) => {
  const classes = useStyles();

  const { todoSavedDispatch } = useContext(TodoSavedContext);

  // ダークモードのOnOff
  const handleDarkModeOn = () => {
    localStorage.setItem("darkMode", "on");
    props.setDarkMode(true);
  };
  const handleDarkModeOff = () => {
    localStorage.setItem("darkMode", "off");
    props.setDarkMode(false);
  };

  // アイコンボタン（設定）のメニュー
  const [anchorEl, setAnchorEl] = React.useState(null);
  // 設定のメニューを開く
  const handleSetting = (event) => {
    console.log("handleSetting");
    setAnchorEl(event.currentTarget);
  };
  // 設定のメニューを閉じる
  const handleClose = () => {
    console.log("handleClose");
    setAnchorEl(null);
  };
  // デフォルトデータの取り込み
  const handleGet = () => {
    console.log("handleGet");
    todoSavedDispatch({ type: "getDefault" });
    setAnchorEl(null);
  };
  // 全データ削除
  const handleClear = () => {
    console.log("handleClear");
    todoSavedDispatch({ type: "clear" });
    setAnchorEl(null);
  };
  // ローカルストレージクリア
  const handleLocalClear = () => {
    console.log("handleLocalClear");
    handleDarkModeOff();
    todoSavedDispatch({ type: "localClear" });
    setAnchorEl(null);
  };

  // ////////////////////////////////////////////////////
  // RETURN /////////////////////////////////////////////
  console.log("レンダー（header.jsx）");
  return (
    <>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <ListAltIcon />
            <Typography variant="h6" className={classes.title}>
              TodoList
            </Typography>
            {props.darkMode ? (
              <Tooltip title="ライトモードへ">
                <IconButton color="inherit" onClick={handleDarkModeOff}>
                  <Brightness7Icon size="large" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="ダークモードへ">
                <IconButton color="inherit" onClick={handleDarkModeOn}>
                  <Brightness4Icon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="設定">
              <IconButton color="inherit" onClick={handleSetting}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <MenuItem disabled={true}>
                (注)現在のデータは全削除されます
              </MenuItem>
              <MenuItem onClick={handleGet}>
                デフォルトデータを取り込む
              </MenuItem>
              <MenuItem onClick={handleClear}>全データ削除</MenuItem>
              <MenuItem onClick={handleLocalClear}>
                ローカルストレージをクリア
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar /> {/* これが無いと次のコンテンツが下にもぐる */}
    </>
  );
};

export default Header;
