import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import {Paper} from "@material-ui/core";
// import mailImg from "../../../assets/images.png";
import mailImg from "../../../assets/images/images.png"
import style from "./CheckPage.module.css";

export const CheckPage: React.FC = () => {
    return (
        <Grid container justify="center">
            <Grid item xs={4}>
                <Paper elevation={6} style={{padding: "20px", width: "300px"}}>
                    <h2>It-incubator</h2>
                    <img src={mailImg}/>
                    <h3>Check Email</h3>
                    <div className={style.description}>click the link in the message in your email</div>
                </Paper>
            </Grid>
        </Grid>
    )
}