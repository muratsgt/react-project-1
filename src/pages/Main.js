import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, CircularProgress } from "@material-ui/core";
import MediaCard from "../components/MediaCard";
import { fetchData } from "../helper/FetchData";
import Pagination from "@material-ui/lab/Pagination";
import Backdrop from "@material-ui/core/Backdrop";

const RESULT_PER_PAGE = 12;

const stylesFunc = makeStyles((theme) => ({
  wrapper: {
    marginTop: "5rem",
    textAlign: "center",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Main() {
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [loading, setLoading] = useState(false);


  const mainStyles = stylesFunc();

  useEffect(() => {
    fetchData(`/user?page=${page - 1}&limit=${RESULT_PER_PAGE}`)
      .then((res) => {
        setUserData(res?.data);
        const num = Math.ceil(res?.total / RESULT_PER_PAGE);
        setMaxPage(num);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [page]);

  const changePage = (event, value) => {
    setPage(value);
    setLoading(true);
  };

  return (
    <Container className={mainStyles.wrapper}>
      <Backdrop className={mainStyles.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {!userData ? (
        <CircularProgress />
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
          <Grid container justify="center">
            <Pagination
              count={maxPage}
              color="primary"
              page={page}
              onChange={changePage}
              size="large"
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Main;
