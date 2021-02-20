import React from "react";
import { Button, TextField, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import firebase from "../firebase/firebase.utils";
import * as Yup from "yup";

const signupSchema = Yup.object().shape({
  displayName: Yup.string()
    .required("Display name is required")
    .min(4, "Should be 4 chars minimum."),
  email: Yup.string().email("Invalid Email").required("Email required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

const styles = makeStyles({
  wrapper: {
    marginTop: "5rem",
    padding: 5,
  },
});

function Signup() {
  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      firebase.register(values.displayName, values.email, values.password);
    },
    validationSchema: signupSchema,
  });

  const googleClick = () => {
    firebase.signWithGoogle();
  };

  const signupStyles = styles();
  return (
    <div>
      <Container className={signupStyles.wrapper} maxWidth="sm">
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="displayName"
                label="Display Name"
                variant="outlined"
                fullWidth
                value={formik.values.displayName}
                onChange={formik.handleChange}
                error={formik.errors.displayName}
                helperText={formik.errors.displayName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                id="outlined-basic"
                label="E-mail"
                variant="outlined"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
                helperText={formik.errors.email}
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
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
                helperText={formik.errors.password}
              />
            </Grid>
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
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={googleClick}
              >
                Sign up with Google
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>

      {/* 
            displayName input
            email input
            password input
            submit button

            google signup button
            */}
    </div>
  );
}

export default Signup;
