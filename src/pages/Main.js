import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import axios from "axios";
import MediaCard from "../components/MediaCard";
// import { fetchData } from "../helper/FetchData";

const stylesFunc = makeStyles((theme) => ({
  wrapper: {
    marginTop: "5rem",
    height: "calc(100vh - 20rem)",
    textAlign: "center",
  },
}));

function Main() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { REACT_APP_API_BASE_URL, REACT_APP_API_TOKEN } = process.env;

  const mainStyles = stylesFunc();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${REACT_APP_API_BASE_URL}/user`, {
        headers: { "app-id": REACT_APP_API_TOKEN },
      })
      .then((resp) => setUserData(resp?.data?.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container className={mainStyles.wrapper}>
      {loading && <Typography variant="h4">Loading page...</Typography>}
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        {userData &&
          userData?.map((user) => {
            return (
              <Grid key={user.id} item md={4} sm={6} xs={12} spacing={3}>
                <MediaCard user={user} />
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}

export default Main;
