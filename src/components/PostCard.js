import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { format as formatDate, parseISO } from "date-fns";
import { useHistory } from "react-router-dom";
import { fetchData } from "../helper/FetchData";
import CommentCard from "./CommentCard";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    margin: "auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    height: "3rem",
    width: "3rem",
  },
  avatarImage: {
    resizeMode: "contain",
    height: "3rem",
    width: "3rem",
  },
  tagsArea: {
    margin: 0,
    padding: 0,
  },
  linkWord: {
    marginLeft: 7,
    marginRight: 7,
  },
}));

export default function PostCard({ post }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState(null);
  const history = useHistory();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const clickTag = (tag) => {
    history.push(`/tag/${tag}/post`);
  };

  useEffect(() => {
    fetchData(`/post/${post.id}/comment`)
      .then((res) => setComments(res?.data))
      .catch((err) => console.log(err));
  }, [post.id]);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img
              className={classes.avatarImage}
              src={post.owner.picture}
              alt="User Picture"
            ></img>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.owner.firstName + " " + post.owner.lastName}
        subheader={formatDate(parseISO(post.publishDate), "dd MMM yyyy, HH:mm")}
      />
      <CardMedia
        className={classes.media}
        image={post.image}
        title={post.text}
      />
      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">
          {post.text}
        </Typography>
      </CardContent>
      <CardContent className={classes.tagsArea}>
        {post.tags.map((tag) => (
          <Link
            component="button"
            variant="body2"
            className={classes.linkWord}
            onClick={() => clickTag(tag)}
          >
            #{tag}
          </Link>
        ))}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Typography variant="body2" component="p">
          {post.likes} Likes
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {comments?.map((item) => {
            return <CommentCard item={item}></CommentCard>;
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
}
