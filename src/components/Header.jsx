import React, { useContext } from "react";
import { TodoSavedContext } from "../App";

// material-ui関連のインポート
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import ListAltIcon from "@material-ui/icons/ListAlt";
import IconButton from "@material-ui/core/IconButton";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import SettingsIcon from "@material-ui/icons/Settings";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

//ヘッダーをスライドで隠す
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

  // const { todoSavedDispatch } = useContext(TodoSavedContext);
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

  // 設定メニューボタンの設定
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleSetting = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleGet = () => {
    todoSavedDispatch({ type: "getDefault" });
    setAnchorEl(null);
  };
  const handleClear = () => {
    todoSavedDispatch({ type: "clear" });
    setAnchorEl(null);
  };
  const handleLocalDelete = () => {
    handleDarkModeOff();
    todoSavedDispatch({ type: "localDelete" });
    setAnchorEl(null);

    // localStorage.clear();
  };

  // ////////////////////////////////////////////////////
  // RETURN /////////////////////////////////////////////
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
              // anchorOrigin={{
              //   horizontal: "right",
              // }}
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
              <MenuItem onClick={handleLocalDelete}>
                ローカルストレージをクリア
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar /> {/* これが無いと次のコンテンツが下にもぐる */}
      {console.log("レンダー： header.jsx")}
    </>
  );
};

export default Header;
