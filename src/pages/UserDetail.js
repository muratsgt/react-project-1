import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../helper/FetchData";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button, CircularProgress} from "@material-ui/core";
import { format as formatDate, parseISO } from "date-fns";
import EmailIcon from '@material-ui/icons/Email';

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

function UserDetail() {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState();
  const mainStyles = stylesFunc();

  const sendEmail = () => {
    window.open("mailto:"+userDetail?.email);
  }

  useEffect(() => {
    fetchData(`/user/${id}`)
      .then((res) => setUserDetail(res))
      .catch((err) => console.log(err))
  }, [id]);

  return (
      <Container>
        {!userDetail ? (
          <Container className={mainStyles.wrapper}>
            <CircularProgress />
          </Container>
        ) : (
          <Container className={mainStyles.wrapper}>
            <div className={mainStyles.boxArea}>
              <img
                className={mainStyles.image}
                src={userDetail?.picture}
                alt={userDetail?.firstName}
              />
              <Typography variant="h4" style={{ textAlign: "center", fontFamily: 'Roboto' }}>
                {userDetail?.firstName} {userDetail?.lastName}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className={mainStyles.buttonStyle}
              >
                Posts
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={mainStyles.buttonStyle}
                onClick={sendEmail}
                startIcon={<EmailIcon />}
              >
                Send e-mail
              </Button>
            </div>
            <div className={mainStyles.boxArea}>
              <Typography variant="h6" color="textSecondary">
                E-mail
              </Typography>
              <Typography variant="h5" color="textPrimary">
                {userDetail?.email}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Country
              </Typography>
              <Typography variant="h5" color="textPrimary">
                {userDetail?.location.country}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Address
              </Typography>
              <Typography variant="h5" color="textPrimary">
                {userDetail?.location.street +
                  " / " +
                  userDetail?.location.city}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Date of Birth
              </Typography>
              {userDetail?.dateOfBirth && (
                <Typography variant="h5">
                  {formatDate(parseISO(userDetail.dateOfBirth), "MM/dd/yyyy")}
                </Typography>
              )}
              <Typography variant="h6" color="textSecondary">
                Phone Number
              </Typography>
              <Typography variant="h5" color="textPrimary">
                {userDetail?.phone}
              </Typography>
            </div>
          </Container>
        )}
      </Container>
  );
}

export default UserDetail;
