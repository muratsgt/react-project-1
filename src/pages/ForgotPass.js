import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Container,
  Avatar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../firebase/firebase.utils";
import { Formik } from "formik";
import * as Yup from "yup";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Alert from "@material-ui/lab/Alert";

const signinSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email required"),
});

const styles = makeStyles((theme) => ({
  wrapper: {
    marginTop: "5rem",
    textAlign: "center",
  },
  avatar: {
    margin: "1rem auto",
    backgroundColor: theme.palette.secondary.main,
  },
}));

const initialValues = {
  email: "",
  password: "",
};

function ForgotPass() {
  const [emailError, setEmailError] = useState(null);
  const [successReset, setSuccessReset] = useState(null);

  const checkResult = (res) => {
    if (res == "Success") {
      setEmailError(null);
      setSuccessReset(true);
    } else {
      setSuccessReset(null);
      setEmailError("E-mail address not found!");
    }
  };

  const handleFormSubmit = (values) => {
    firebase
      .forgotPass(values.email)
      .then(checkResult)
      .catch((errorr) => console.log("errorr", errorr));
  };

  const signinStyles = styles();

  return (
    <Container className={signinStyles.wrapper} maxWidth="sm">
      <Avatar className={signinStyles.avatar}>
        <VpnKeyIcon />
      </Avatar>
      <Typography style={{ margin: 10 }} variant="h4">
        Forgot your password?
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={signinSchema}
      >
        {({ handleSubmit, getFieldProps, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  error
                  name="email"
                  id="outlined-basic"
                  label="E-mail"
                  variant="outlined"
                  fullWidth
                  {...getFieldProps("email")}
                  error={touched.email && errors.email}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              {emailError && (
                <Grid item xs={12}>
                  <Alert severity="error">{emailError}</Alert>
                </Grid>
              )}
              {successReset && (
                <Grid item xs={12}>
                  <Alert severity="success">"A link has sent to your email."</Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Container>
  );
}

export default ForgotPass;
