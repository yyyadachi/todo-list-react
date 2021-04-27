import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import ListAltIcon from "@material-ui/icons/ListAlt";

//ヘッダーをスライドで隠すための設定///////////////////////
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

//スイッチボタンを右に配置///////////////////////
const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

/////////////////export Header///////////////////////
const Header = (props) => {
  //スイッチボタンの設定
  const [check, setCheck] = useState(false);

  const handleChange = (event) => {
    setCheck(event.target.checked);
    //TODO check更新でダークモード適用・未適用を変更する処理を追加（Appにダークモードに変更する関数を書いてpropsで渡す→useEffectで発火）
  };

  const classes = useStyles();

  /////////////////return///////////////////////
  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <ListAltIcon />
            <Typography variant="h6" className={classes.title}>
              TodoList
            </Typography>
            <FormControlLabel
              control={<Switch checked={check} onChange={handleChange} />}
              label="Dark Mode(未)"
            />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar /> {/* これが無いと次のコンテンツが下にもぐる */}
    </React.Fragment>
  );
};

export default Header;
