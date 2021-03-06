import { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Container,
  Snackbar,
  Avatar,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import firebase from "../firebase/firebase.utils";
import * as Yup from "yup";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const signupSchema = Yup.object().shape({
  displayName: Yup.string()
    .required("Display name is required")
    .min(4, "Should be 4 chars minimum."),
  email: Yup.string().email("Invalid Email").required("Email required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

const styles = makeStyles((theme)=>({
  wrapper: {
    marginTop: "5rem",
    textAlign: "center"
  },
  avatar: {
    margin: "1rem auto",
    backgroundColor: theme.palette.secondary.main,
  },
}));

function Signup() {
  const [signError, setSignError] = useState(null);
  const [open, setOpen] = useState(false);

  const history = useHistory();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const checkResult = (res) => {
    if (res == "Success") {
      history.push(`/`);
    } else {
      setSignError(res);
    }
  };

  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      firebase
        .register(values.displayName, values.email, values.password)
        .then(checkResult)
        .finally(() => setOpen(true));
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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {signError}
          </Alert>
        </Snackbar>
        <Avatar className={signupStyles.avatar}>
        </Avatar>
        <Typography style={{ margin: 10 }} variant="h4">
          Sign up
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="displayName"
                label="Display Name"
                variant="outlined"
                fullWidth
                // value={formik.values.displayName}
                // onChange={formik.handleChange}
                {...formik.getFieldProps("displayName")}
                error={formik.touched.displayName && formik.errors.displayName}
                helperText={
                  formik.touched.displayName && formik.errors.displayName
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                id="outlined-basic"
                label="E-mail"
                variant="outlined"
                fullWidth
                // value={formik.values.email}
                // onChange={formik.handleChange}
                {...formik.getFieldProps("email")}
                error={formik.touched.email && formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
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
                // value={formik.values.password}
                // onChange={formik.handleChange}
                {...formik.getFieldProps("password")}
                error={formik.touched.password && formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
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
    </div>
  );
}

export default Signup;
