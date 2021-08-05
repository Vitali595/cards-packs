import * as React from 'react'
import {useFormik} from "formik";
import {loginTC} from "../../reducers/r1-LogupReducer";
import {useDispatch, useSelector} from "react-redux";
import {FormControl, FormGroup, TextField, Button, Grid} from '@material-ui/core'
import {AppRootStateType} from "../../app/store";
import {Redirect} from "react-router-dom";
import style from "./SignUp.module.css"
import {SuperHeader} from "../../common/c6-SuperHeader/SuperHeader";
import {SuperButton} from "../../common/c2-SuperButton/SuperButton";

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const SignUp = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = "Required"
            } else if (values.password.length < 7) {
                errors.password = "the password must be more than 7 characters"
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = "Required"
            } else if (values.confirmPassword.length < 7) {
                errors.confirmPassword = "the password must be more than 7 characters"
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    const {isLogUp} = useSelector((state: AppRootStateType) => state.logup)
    if (isLogUp) {
        return <Redirect from={'*'} to={'/log_in'}/>
    }

    return (
        <div className={style.paper}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl className={style.formControl}>
                    <SuperHeader text={"Sign Up"}/>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="dense"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email &&
                        formik.errors.email
                            ? <div style={{color: "red"}}>{formik.errors.email}</div>
                            : <div><br/></div>}
                        <TextField
                            type="password"
                            label="Password"
                            margin="dense"
                            {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password &&
                        formik.errors.password
                            ? <div style={{color: "red"}}>{formik.errors.password}</div>
                            : <div><br/></div>}
                        <TextField
                            type="password"
                            label="Confirm password"
                            margin="dense"
                            {...formik.getFieldProps("confirmPassword")}
                        />
                        {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                            ? <div style={{color: "red"}}>{formik.errors.confirmPassword}</div>
                            : <div><br/></div>}
                            <div className={style.register}>
                                <SuperButton text={"Register"}/>
                            </div>
                    </FormGroup>
                </FormControl>
            </form>
        </div>
    )
}