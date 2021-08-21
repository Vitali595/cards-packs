import React, {useState} from "react"
import style from "./MainPage.module.css"
import cardsImage from "../../assets/images/Group 608.png";
import userImage from "../../assets/images/Group 607.png";
import {Profile} from "../Profile/Profile";
import {PacksList} from "../PacksList/PacksList";
import {CardsList} from "../CardsList/CardsList";

export const MainPage: React.FC = () => {

    const [switchOn, setSwitchOn] = useState<boolean>(false)
    const [isCards, setIsCards] = useState<boolean>(false)
    const [packName, setPackName] = useState<string>("")
    const [packId, setPackId] = useState<string>("")

    const packsListPage = {
        background: switchOn ? "#DCCCDB" : "#EBE0E9",
        borderBottom: switchOn ? "#21268F solid 3px" : "none",
        opacity: switchOn ? "" : "0.5",
        padding: "15px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const setProfile = () => {
        setSwitchOn(false)
        setIsCards(false)
    }

    const setPacksList = () => {
        setSwitchOn(true)
        setIsCards(false)
    }

    const setCardsList = (name: string, id: string) => {
        setIsCards(true)
        setPackName(name)
        setPackId(id)
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
                    <div style={packsListPage} onClick={setPacksList}>
                        <img className={style.image} src={cardsImage}/>
                        <span className={style.text}>Packs list</span>
                    </div>
                    <div style={profilePage} onClick={setProfile}>
                        <img className={style.image} src={userImage}/>
                        <span className={style.text}>Profile</span>
                    </div>
                </div>
                <div style={{width: "200px"}}/>
            </div>
            <div className={style.currentPage}>
                {isCards ? <CardsList packName={packName} packId={packId}/> : (switchOn
                    ? <PacksList isPrivate={false} setCardsList={setCardsList}/>
                    : <Profile isPrivate={true} setCardsList={setCardsList}/>)}
            </div>
        </div>

    )
}