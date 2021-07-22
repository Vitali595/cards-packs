import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {setPassTC} from "../../reducers/r4-SetPassReducer";
import {Redirect, useParams} from "react-router-dom";
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import {useFormik} from "formik";
import style from "./SetPass.module.css";
import {Paper} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

type FormikErrorType = {
    password?: string
    confirmPassword?: string
}

export const SetPass: React.FC = () => {
    const {loading, success, error} = useSelector((state: AppRootStateType) => state.setPass)
    const {token} = useParams<{ token: string }>()
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState<boolean>(false)

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
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
            dispatch(setPassTC(token, values.password, values.confirmPassword))
            formik.resetForm()
        },
    })

    useEffect(() => {
        if (success && !redirect) {
            setTimeout(() => setRedirect(true), 500)
        }
    }, [success, dispatch, redirect, setRedirect])

    if (redirect && success) {
        return <Redirect to={"/log_in"}/>
    }

    return <Grid container justify="center">
        <Grid item xs={4}>
            <Paper elevation={6} style={{padding: "20px", width: "300px"}}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <h2>It-incubator</h2>
                        <h3>Create new password</h3>
                        {loading
                            ? <div><CircularProgress/></div>
                            : error
                                ? <div style={{color: "red"}}>{error}<br/></div>
                                : success
                                    ? <div style={{color: "green"}}>Success!</div>
                                    : <div><br/><br/></div>
                        }
                        <FormGroup>
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password &&
                            formik.errors.password
                                ? <div style={{color: "red"}}>{formik.errors.password}</div>
                                : <div><br/><br/></div>}
                            <TextField
                                type="password"
                                label="Confirm password"
                                margin="normal"
                                {...formik.getFieldProps("confirmPassword")}
                            />
                            {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                                ? <div style={{color: "red"}}>{formik.errors.confirmPassword}</div>
                                : <div><br/><br/></div>}
                            <div className={style.description}>Create new password and we will send you further
                                instructions to email
                            </div>
                            <Button type={'submit'} variant={'contained'} color={'primary'} disabled={loading}
                                    size={"small"} style={{borderRadius: "15px"}}>Create new password</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Paper>
        </Grid>
    </Grid>
}