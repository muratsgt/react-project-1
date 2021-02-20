import React from "react";
import { Button, TextField, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../firebase/firebase.utils";
import { Formik } from "formik";
import * as Yup from "yup";

const signinSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email required"),
  password: Yup.string()
  .required('No password provided.') 
  .min(8, 'Password is too short - should be 8 chars minimum.')
});

const styles = makeStyles({
  wrapper: {
    marginTop: "5rem",
    padding: 5,
  },
});

const initialValues = {
  email: "",
  password: "",
};

function Signin() {
  const googleClick = () => {
    firebase.signWithGoogle();
  };

  const handleFormSubmit = (values) => {
    firebase.signIn(values.email, values.password);
  };

  const signinStyles = styles();
  return (
    <Container className={signinStyles.wrapper} maxWidth="sm">
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={signinSchema}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  id="outlined-basic"
                  label="E-mail"
                  variant="outlined"
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email}
                  helperText={errors.email}
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
                  value={values.password}
                  onChange={handleChange}
                  error={errors.password}
                  helperText={errors.password}
                />
              </Grid>
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
