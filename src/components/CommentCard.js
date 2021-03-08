import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { format as formatDate, parseISO } from "date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    boxShadow: "none",
    borderTop: "1px solid #ccc",
    borderRadius: 0,
    textAlign: "left",
    paddingTop: 10,
    margin: 0,
  },
  avatar: {
    height: "2rem",
    width: "2rem",
  },
  image: {
    resizeMode: "contain",
    height: "2rem",
    width: "2rem",
  },
  headContainer: {
    margin: 0,
    padding: 0,
  },
}));

export default function CommentCard({ item }) {
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.headContainer}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img
              className={classes.image}
              src={item.owner.picture}
              alt="User Picture"
            ></img>
          </Avatar>
        }
        title={item.owner.firstName + " " + item.owner.lastName}
        subheader={formatDate(parseISO(item.publishDate), "dd MMM yyyy, HH:mm")}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {item.message}
        </Typography>
      </CardContent>
    </Card>
  );
}
