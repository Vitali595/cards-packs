import React from 'react'
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    TextField,
    Grid, Paper
} from '@material-ui/core'
import {useFormik} from "formik";
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LoginTC} from "../../reducers/r2-LoginReducer";
import {Preloader} from "../Preloader/Preloader";
import {ErrorSnackbar} from "../Error/ErrorSnackbar";
import {DisabledButton} from "../../common/c4-DisabledButton/DisabledButton";
import {AppRootStateType} from "../../app/store";
import {ResponseType} from "../../api/LoginAPI";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const LogIn = React.memo(function () {

    const profile = useSelector<AppRootStateType, ResponseType>(state => state.login.profile)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Must be 3 characters or more';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(LoginTC(values))
            formik.resetForm()
        },
    })

    if (profile._id) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <Preloader/>
        <ErrorSnackbar/>
        <Grid container justify="center">
            <Grid item xs={4}>
                <Paper elevation={6} style={{padding: "20px"}}>
                    <FormControl>
                        <form onSubmit={formik.handleSubmit}>
                            <FormGroup>
                                <div>Enter your email and password to login</div>
                                <div>password: qwertyui</div>
                                <TextField
                                    label="Email"
                                    margin="normal"
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email &&
                                <div style={{color: "red"}}>{formik.errors.email}</div>}
                                <TextField
                                    type="password"
                                    label="Password"
                                    margin="normal"
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password && formik.errors.password &&
                                <div style={{color: "red"}}>{formik.errors.password}</div>}
                                <FormControlLabel
                                    label={'Remember me'}
                                    control={<Checkbox/>}
                                    {...formik.getFieldProps('rememberMe')}
                                />
                                <DisabledButton title={"Login"} variant={'contained'}/>
                            </FormGroup>
                        </form>
                    </FormControl>
                </Paper>
            </Grid>
        </Grid>
    </div>
})

//https://www.youtube.com/watch?v=6VmVYi9yrAA


