import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../app/store"
import {Redirect, useHistory} from "react-router-dom"
import {Preloader} from "../Preloader/Preloader"
import {ResponseType} from "../../api/LoginAPI"
import style from "./Profile.module.css"
import defaultAvatar from "../../assets/images/defaultAvatar.png"
import {SuperButton} from "../../common/c2-SuperButton/SuperButton";
import {PacksTable} from "../Forgot/table/PacksTable";
import {SuperSmallButton} from "../../common/c3-SuperSmallButton/SuperSmallButton";
import {Paginator} from "../../features/pagination/Paginator";
import {setPacksListTC} from "../../reducers/r9-PacksReducer";


export const Profile = function () {
        const dispatch = useDispatch()
        const history = useHistory()
        const profile = useSelector<AppRootStateType, ResponseType>(state => state.signIn.profile)
        const {
            cardPacks, page, pageCount, minCardsCount, maxCardsCount,
            sortPacks, cardPacksTotalCount, searchPackName
        } = useSelector((state: AppRootStateType) => state.packs)
        const [isPrivatePacks, setIsPrivatePacks] = useState<boolean>(false)

        const onPageChanged = (pageNumber: number) => {
            if (!isPrivatePacks) {
                dispatch(setPacksListTC(undefined, pageCount, pageNumber, searchPackName, minCardsCount, maxCardsCount, sortPacks))
            } else {
                dispatch(setPacksListTC(profile._id, pageCount, pageNumber, searchPackName, minCardsCount, maxCardsCount, sortPacks))
            }
        }
        const selectCallback = (value: string) => {
            if (!isPrivatePacks) {
                dispatch(setPacksListTC(undefined, +value, page, searchPackName, minCardsCount, maxCardsCount, sortPacks))
            } else {
                dispatch(setPacksListTC(profile._id, +value, page, searchPackName, minCardsCount, maxCardsCount, sortPacks))
            }
        }

        useEffect(() => {
            dispatch(setPacksListTC(profile._id, pageCount, page, searchPackName, minCardsCount, maxCardsCount, sortPacks))
        }, [])

        if (!profile._id) {
            return <Redirect to={'/log_in'}/>
        }

        return (
            <div className={style.paper}>
                <div className={style.aboutMe}>
                    <div className={style.personal}>
                        <img className={style.avatar} src={profile.avatar ? profile.avatar : defaultAvatar} alt="avatar"/>
                        <div className={style.name}>Petr Ivanov</div>
                        <div className={style.description}>Front-end developer</div>
                        <SuperSmallButton text={"Edit profile"}/>
                    </div>
                </div>
                <div className={style.packsTable}>
                    <div className={style.header}>My packs list</div>
                    <div className={style.search}>
                        <div className={style.cell} id="container">
                            <div><input type="search" placeholder="Search..."/></div>
                        </div>
                        <SuperButton text={"Search"}/>
                    </div>
                    <PacksTable/>
                    <Paginator totalItemsCount={cardPacksTotalCount} currentPage={page} pageSize={pageCount}
                               onPageChanged={onPageChanged} selectCallback={selectCallback}/>

                </div>

            </div>
        )

    }