import { Avatar, Divider, ListItemAvatar, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC, useEffect, useRef } from "react";
import { PostResponse } from "../generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxHeight: "50vh",
      overflowY: "scroll",
    },
    inline: {
      display: "inline",
    },
  })
);

const ChatListItem: FC<{ item: PostResponse; isLast: boolean }> = ({
  item,
  isLast,
}) => {
  const classes = useStyles();
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar src="https://dummyimage.com/40" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Typography
                component="span"
                variant="body1"
                className={classes.inline}
                color="textPrimary"
              >
                {item.author}
              </Typography>
            </>
          }
          secondary={
            <>
              <Typography
                component="span"
                variant="body1"
                style={{ wordBreak: "break-all" }}
              >
                {item.body}
              </Typography>
            </>
          }
        />
      </ListItem>
      {!isLast && <Divider variant="inset" component="li" />}
    </>
  );
};

export const ChatItems: FC<{ items: PostResponse[] }> = ({ items }) => {
  const classes = useStyles();
  const endRef = useRef<any>();

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [items]);

  return (
    <List className={classes.root}>
      {items.map((item, index) => (
        <ChatListItem
          key={item._id}
          item={item}
          isLast={index === items.length - 1}
        />
      ))}
      <div style={{ float: "left", clear: "both" }} ref={endRef} />
    </List>
  );
};
