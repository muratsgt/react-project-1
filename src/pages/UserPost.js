import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../helper/FetchData";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button, CircularProgress} from "@material-ui/core";

const stylesFunc = makeStyles((theme) => ({
  wrapper: {
    marginTop: "3rem",
    textAlign: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  boxArea: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 11,
    margin: 11,
    textAlign: "left",
  },
  image: {
    width: 200,
    height: "auto",
    borderRadius: 10,
    margin: 15,
    alignSelf: "center"
  },
  buttonStyle: {
    margin: 5,
  },
}));

function UserPost() {
  const { id } = useParams();
  const [userPost, setUserPost] = useState();
  const mainStyles = stylesFunc();

  useEffect(() => {
    fetchData(`/user/${id}/post`)
      .then((res) => setUserPost(res))
      .catch((err) => console.log(err))
  }, [id]);

  return (
      <Container>
        {!userPost ? (
          <Container className={mainStyles.wrapper}>
            <CircularProgress />
          </Container>
        ) : (
          <Container className={mainStyles.wrapper}>
            <div className={mainStyles.boxArea}>
              {JSON.stringify(userPost)}
            </div>
          </Container>
        )}
      </Container>
  );
}

export default UserPost;
