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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

const signinSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

const styles = makeStyles((theme) => ({
  wrapper: {
    marginTop: "5rem",
    height: "calc(100vh - 20rem)",
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

function Signin() {
  const [loginError, setLoginError] = useState(null);
  const history = useHistory();

  const googleClick = () => {
    firebase.signWithGoogle();
  };

  const checkResult = (res) => {
    if (res == "Success") {
      history.push(`/`);
    } else {
      setLoginError(res);
    }
  };

  const handleFormSubmit = (values) => {
    firebase
      .singIn(values.email, values.password)
      .then(checkResult)
      .catch((errorr) => console.log("errorr", errorr));
  };

  const signinStyles = styles();

  return (
    <Container className={signinStyles.wrapper} maxWidth="sm">
      <Avatar className={signinStyles.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography style={{ margin: 10 }} variant="h4">
        Sign in
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
                  // value={values.email}
                  // onChange={handleChange}
                  {...getFieldProps("email")}
                  error={touched.email && errors.email}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  // value={values.password}
                  // onChange={handleChange}
                  {...getFieldProps("password")}
                  error={touched.password && errors.password}
                  helperText={touched.password && errors.password}
                />
              </Grid>
              {loginError && (
                <Grid item xs={12}>
                  <Alert severity="error">{loginError}</Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={googleClick}
                >
                  Sign in with Google
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Container>
  );
}

export default Signin;
