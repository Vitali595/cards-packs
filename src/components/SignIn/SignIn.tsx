import React from "react"
import {FormControl, FormGroup, TextField} from "@material-ui/core"
import {useFormik} from "formik"
import {NavLink, Redirect, useHistory} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {LoginTC} from "../../reducers/r2-LoginReducer"
import {Preloader} from "../Preloader/Preloader"
import {ErrorSnackbar} from "../Error/ErrorSnackbar"
import {AppRootStateType} from "../../app/store"
import {ResponseType} from "../../api/LoginAPI"
import style from "./SignIn.module.css"
import {SuperNavLink} from "../../common/c5-SuperNavLink/SuperNavLink";
import {SuperButton} from "../../common/c2-SuperButton/SuperButton";
import {SuperHeader} from "../../common/c6-SuperHeader/SuperHeader";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const SignIn = function () {

    const profile = useSelector<AppRootStateType, ResponseType>(state => state.signIn.profile)
    const dispatch = useDispatch()
    const history = useHistory()

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
        return <Redirect to={'/main'}/>
    }

    return (
        <div>
        <Preloader/>
        <ErrorSnackbar/>
        <div className={style.paper}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl className={style.formControl}>
                    <SuperHeader text={"Sign In"}/>
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
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password &&
                        formik.errors.password
                            ? <div style={{color: "red"}}>{formik.errors.password}</div>
                            : <div><br/></div>}
                        <div className={style.forgot} onClick={() => history.push("/forgot")}>Forgot Password</div>
                        {/*<DisabledButton title={"SignIn"} variant={'contained'}/>*/}
                        <SuperButton text={"SignIn"}/>
                        <div className={style.description}>Dont have an account?</div>
                        <SuperNavLink path={"/log_up"} text={"Sign Up"}/>
                    </FormGroup>
                </FormControl>
            </form>
        </div>
    </div>
    )
}