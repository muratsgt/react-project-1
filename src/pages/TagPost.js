import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../helper/FetchData";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import PostCard from "../components/PostCard";

const stylesFunc = makeStyles((theme) => ({
  wrapper: {
    marginTop: "3rem",
    textAlign: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));

function TagPost() {
  const { tag } = useParams();
  const [tagPost, setTagPost] = useState();
  const mainStyles = stylesFunc();

  useEffect(() => {
    fetchData(`/tag/${tag}/post`)
      .then((res) => setTagPost(res?.data))
      .catch((err) => console.log(err));
  }, [tag]);

  return (
    <Container>
      {!tagPost ? (
        <Container className={mainStyles.wrapper}>
          <CircularProgress />
        </Container>
      ) : (
        <Container className={mainStyles.wrapper}>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            {tagPost.map((post) => {
              return (
                <Grid
                  key={post.id}
                  item
                  md={4}
                  sm={6}
                  xs={12}
                >
                  <PostCard post={post}></PostCard>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      )}
    </Container>
  );
}

export default TagPost;
