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
    width: 345,
  },
  media: {
    height: 300,
  },
});

// email: "heinz-georg.fiedler@example.com"
// firstName: "Heinz-Georg"
// id: "0F8JIqi4zwvb77FGz6Wt"
// lastName: "Fiedler"
// picture: "https://randomuser.me/api/portraits/men/81.jpg"
// title: "mr"

export default function MediaCard({ user }) {
  const { email, firstName, id, lastName, picture, title } = user;
  title[0].toUpperCase()

  const classes = useStyles();
  const history = useHistory();
  const cardClick = () => {
    history.push(`/user/${id}`);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={cardClick}>
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
        <Button onClick={cardClick} size="medium" color="primary">
          Profile
        </Button>
        <Button  color="secondary">
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