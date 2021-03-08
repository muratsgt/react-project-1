import React from "react";
import { capitalize } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: "auto",
    marginBottom:'30px',
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.5)",
    '&:hover':{
      transform: "scale(1.02)",
      boxShadow: "0 20px 70px -13px rgba(0,0,0,0.5)"
    }
  },
  media: {
    height: 300,
    width: 300,
  },
});

// email: "heinz-georg.fiedler@example.com"
// firstName: "Heinz-Georg"
// id: "0F8JIqi4zwvb77FGz6Wt"
// lastName: "Fiedler"
// picture: "https://randomuser.me/api/portraits/men/81.jpg"
// title: "mr"

export default function MediaCard({ user }) {
  const { firstName, id, lastName, picture, title } = user;

  const classes = useStyles();
  const history = useHistory();

  const profileClick = () => {
    history.push(`/user/${id}`);
  };

  const postClick = () => {
    history.push(`/user/${id}/post`);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={profileClick}>
        <CardMedia
          className={classes.media}
          image={picture}
          title={`${title} ${firstName} ${lastName}`}
        />
        <CardContent style={{padding: 9}}>
          <Typography variant="h5" component="h2">
            {capitalize(title)} {firstName} {lastName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{display: "flex", justifyContent: "center"}}>
        <Button onClick={profileClick} size="medium" color="primary">
          Profile
        </Button>
        <Button onClick={postClick} color="secondary">
          Posts
        </Button>
      </CardActions>
    </Card>
  );
}

// sadece development kisminda kullaniliyor, yardimci olmasi icin
MediaCard.propTypes = {
  user: PropTypes.object.isRequired,
};