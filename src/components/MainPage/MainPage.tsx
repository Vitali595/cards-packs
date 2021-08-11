import React, {useState} from "react"
import style from "./MainPage.module.css"
import cardsImage from "../../assets/images/Group 608.png";
import userImage from "../../assets/images/Group 607.png";
import {Profile} from "../Profile/Profile";
import {PacksList} from "../PacksList/PacksList";

export const MainPage: React.FC = () => {

    const [switchOn, setSwitchOn] = useState<boolean>(false)

    const packsListPage = {
        background: switchOn ? "#DCCCDB" : "#EBE0E9",
        borderBottom: switchOn ? "#21268F solid 3px" : "none",
        opacity: switchOn ? "" : "0.5",
        padding: "15px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const profilePage = {
        background: switchOn ? "#EBE0E9" : "#DCCCDB",
        borderBottom: !switchOn ? "#21268F solid 3px" : "none",
        opacity: switchOn ? "0.5" : "",
        padding: "15px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    return (
        <div className={style.main}>
            <div className={style.header}>
                <div className={style.title}>Cards-Packs</div>
                <div className={style.pages}>
                    <div style={packsListPage} onClick={() => setSwitchOn(true)}>
                        <img className={style.image} src={cardsImage}/>
                        <span className={style.text}>Packs list</span>
                    </div>
                    <div style={profilePage} onClick={() => setSwitchOn(false)}>
                        <img className={style.image} src={userImage}/>
                        <span className={style.text}>Profile</span>
                    </div>
                </div>
                <div style={{width: "200px"}}/>
            </div>
            <div className={style.currentPage}>
                {switchOn ? <PacksList isPrivate={false}/> : <Profile isPrivate={true}/>}
            </div>
        </div>

    )
}