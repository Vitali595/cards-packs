import React from "react"
import {useSelector} from "react-redux"
import {AppRootStateType} from "../../app/store"
import {Redirect} from "react-router-dom"
import {Preloader} from "../Preloader/Preloader"
import {ResponseType} from "../../api/LoginAPI"
import style from "./Profile.module.css"
import defaultAvatar from "../../assets/images/defaultAvatar.png"
import {SuperButton} from "../../common/c2-SuperButton/SuperButton";
import icon from "../../assets/images/Icon.png"
import {Table} from "../Forgot/table/Deals";


export const Profile = React.memo(function () {
        const profile = useSelector<AppRootStateType, ResponseType>(state => state.signIn.profile)

        if (!profile._id) {
            return <Redirect to={'/log_in'}/>
        }

        return (
            <div className={style.paper}>
                {/*<Preloader/>*/}
                {/*<div>*/}
                {/*     <span>*/}
                {/*         <div>*/}
                {/*             {profile && <img src={profile.avatar}*/}
                {/*                              alt={"avatar"}/>}*/}
                {/*         </div>*/}
                {/*         <span>*/}
                {/*             {profile && <div>*/}
                {/*                 {profile.name}*/}
                {/*             </div>}*/}
                {/*         </span>*/}
                {/*     </span>*/}
                {/*</div>*/}
                <div className={style.aboutMe}>
                    <div className={style.personal}>
                        <img className={style.avatar} src={profile.avatar ? profile.avatar : defaultAvatar} alt="avatar"/>
                        <div className={style.name}>Petr Ivanov</div>
                        <div className={style.description}>Front-end developer</div>
                    </div>
                </div>
                <div className={style.packsTable}>
                    <div className={style.search}>
                        <div className={style.cell} id="container">
                            <div><input type="search" placeholder="Search..."/></div>
                        </div>
                        <SuperButton text={"Search"}/>
                    </div>
                    <Table/>
                </div>

            </div>
        )

    }
)