import React from 'react'
import { Button, TextField, Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';


const styles = makeStyles({
    wrapper: {
        marginTop: "5rem",
        padding: 5,
    },
})

function Signup() {

    const formik = useFormik({
        initialValues: {
            displayName: "",
            email: '',
            password: "",
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const signupStyles = styles();
    return (
        <div>
            <Container className={signupStyles.wrapper} maxWidth="sm">
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                name="displayName"
                                name="displayName"
                                label="Display Name"
                                variant="outlined"
                                fullWidth
                                value={formik.values.displayName}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" label="E-mail" variant="outlined" fullWidth
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth
                                name="password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="s" variant="contained" color="primary" fullWidth>Submit</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" fullWidth>Sigup with Google</Button>
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
    )
}

export default Signup
