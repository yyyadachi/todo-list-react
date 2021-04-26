import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import WorkIcon from "@material-ui/icons/Work";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { TodosContext } from "../App";
import { ButtonComponent } from "./index";

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const TodoList = () => {
  const classes = useStyles();
  const { todosState } = useContext(TodosContext);

  return (
    <div className={classes.demo}>
      <List dense={true}>
        {todosState.map((todo, index) => {
          return (
            <ListItem key={index.toString()}>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText
                primary={todo.summary}
                secondary={todo.detail ? todo.detail : null}
              />
              <ButtonComponent
                title="完了"
                color="primary"
                icon={<PlaylistAddCheckIcon />}
                size="small"
                action={"doneTodo"}
              />
              <ButtonComponent
                title="編集"
                color="default"
                icon={<EditIcon />}
                size="small"
                action={"openModal"}
                isNew={false}
              />
              <ButtonComponent
                title="削除"
                color="secondary"
                icon={<DeleteIcon />}
                size="small"
                action={"deleteTodo"}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default TodoList;
