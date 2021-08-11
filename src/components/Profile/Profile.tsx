import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../app/store"
import {Redirect, useHistory} from "react-router-dom"
import {Preloader} from "../Preloader/Preloader"
import {ResponseType} from "../../api/LoginAPI"
import style from "./Profile.module.css"
import defaultAvatar from "../../assets/images/defaultAvatar.png"
import {SuperButton} from "../../common/c2-SuperButton/SuperButton"
import {PacksTable} from "../Forgot/table/PacksTable"
import {SuperSmallButton} from "../../common/c3-SuperSmallButton/SuperSmallButton"
import {Paginator} from "../../features/pagination/Paginator"
import {setPacksListTC} from "../../reducers/r9-PacksReducer"
import {SuperPaper} from "../../common/c7-SuperPaper/SuperPaper"

type ProfilePropsType = {
    isPrivate: boolean
}

export const Profile: React.FC<ProfilePropsType> = ({isPrivate}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const profile = useSelector<AppRootStateType, ResponseType>(state => state.signIn.profile)
    const {
        cardPacks, page, pageCount, minCardsCount, maxCardsCount,
        sortPacks, cardPacksTotalCount, searchPackName
    } = useSelector((state: AppRootStateType) => state.packs)
    const [isPrivatePacks, setIsPrivatePacks] = useState<boolean>(false)


    useEffect(() => {
        if (isPrivate) {
            dispatch(setPacksListTC(profile._id, pageCount, page, "", minCardsCount, maxCardsCount, sortPacks))
        } else {
            dispatch(setPacksListTC(undefined, pageCount, page, "", minCardsCount, maxCardsCount, sortPacks))
        }
    }, [])

    if (!profile._id) {
        return <Redirect to={"/log_in"}/>
    }

    return (
        <SuperPaper>
            <div className={style.aboutMe}>
                <div className={style.personal}>
                    <img className={style.avatar} src={profile.avatar ? profile.avatar : defaultAvatar} alt="avatar"/>
                    <div className={style.name}>Petr Ivanov</div>
                    <div className={style.description}>Front-end developer</div>
                    <SuperSmallButton text={"Edit profile"}/>
                </div>
            </div>
            <div className={style.packsTable}>
                <PacksTable header={"My packs list"} isPrivate={isPrivate}/>
            </div>
        </SuperPaper>
    )

}