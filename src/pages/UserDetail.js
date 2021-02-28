import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../helper/FetchData";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import { format as formatDate, parseISO } from "date-fns";

const stylesFunc = makeStyles((theme) => ({
  wrapper: {
    marginTop: "5rem",
    height: "calc(100vh - 20rem)",
    textAlign: "center",
  },
}));

function UserDetail() {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState();
  const mainStyles = stylesFunc();

  useEffect(() => {
    fetchData(`/user/${id}`)
      .then((res) => setUserDetail(res))
      .catch((err) => console.log(err))
      .finally();
  }, []);

  return (
    <Container className={mainStyles.wrapper}>
      <img
        onClick={() => console.log("onClick")}
        src={userDetail?.picture}
        aspectRatio={4 / 3}
      />
      <Typography variant="h4">{userDetail?.firstName}</Typography>
      <Typography variant="h4">{userDetail?.lastName}</Typography>
      {userDetail?.dateOfBirth && (
        <Typography variant="h4">
          {
            // TODO: move to helper
          }
          {formatDate(parseISO(userDetail.dateOfBirth), "MM/dd/yyyy")}
        </Typography>
      )}
      <Typography variant="h4">{userDetail?.phone}</Typography>
      {JSON.stringify(userDetail)}
    </Container>
  );
}

export default UserDetail;
