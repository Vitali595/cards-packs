import {NavLink} from "react-router-dom";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {forgotTC} from "../../reducers/r7-ForgotReducer";
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import {useFormik} from "formik";
import {Paper} from "@material-ui/core";
import style from "./Forgot.module.css";
import {CheckPage} from "../SetPass/CheckPage/CheckPage";
import {ForgotStatus} from "./ForgotStatus";
import {SuperHeader} from "../../common/c6-SuperHeader/SuperHeader";
import {SuperNavLink} from "../../common/c5-SuperNavLink/SuperNavLink";
import {SuperButton} from "../../common/c2-SuperButton/SuperButton";

type FormikErrorType = {
    email?: string
}

export const Forgot: React.FC = () => {
    const {success, loading} = useSelector((state: AppRootStateType) => state.forgot)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = "Required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address"
            }
            return errors
        },
        onSubmit: values => {
            dispatch(forgotTC(values.email))
            formik.resetForm()
        },
    })

    if (success) {
        return <CheckPage/>
    }

    return (
        <div className={style.paper}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl className={style.formControl}>
                    <SuperHeader text={"Forgot your password?"}/>
                    <ForgotStatus/>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="dense"
                            {...formik.getFieldProps("email")}
                        />
                        {formik.touched.email &&
                        formik.errors.email
                            ? <div style={{color: "red"}}>{formik.errors.email}</div>
                            : <div><br/></div>}
                        <div className={style.description}>Enter your email address and we will send you further
                            instructions
                        </div>
                        <SuperButton text={"Send Instructions"} disabled={loading}/>
                        <div className={style.rememberPass}>Did your remember your password?</div>
                        <SuperNavLink path={"/log_in"} text={"Try logging in"}/>
                    </FormGroup>
                </FormControl>
            </form>
        </div>
    )
}