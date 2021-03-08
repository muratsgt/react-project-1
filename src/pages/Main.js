import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, LinearProgress } from "@material-ui/core";
import MediaCard from "../components/MediaCard";
import { fetchData } from "../helper/FetchData";

const stylesFunc = makeStyles((theme) => ({
  wrapper: {
    marginTop: "5rem",
    textAlign: "center",
  },
}));

function Main() {
  const [userData, setUserData] = useState(null);

  const mainStyles = stylesFunc();

  useEffect(() => {
    fetchData(`/user`)
      .then((res) => setUserData(res?.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container className={mainStyles.wrapper}>
      {!userData ? (
          <LinearProgress />
      ) : (
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          {userData?.map((user) => {
            return (
              <Grid
                style={{ display: "flex", justifyContent: "center" }}
                key={user.id}
                item
                md={4}
                sm={6}
                xs={12}
              >
                <MediaCard user={user} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
}

export default Main;
