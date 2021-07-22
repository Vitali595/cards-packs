import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Redirect} from "react-router-dom";
import {Preloader} from "../Preloader/Preloader";
import {ResponseType} from "../../api/LoginAPI";


export const Profile = React.memo(function () {
        const profile = useSelector<AppRootStateType, ResponseType>(state => state.login.profile)

        if (!profile._id) {
            return <Redirect to={'/log_in'}/>
        }

        return (
            <div>
                <Preloader/>
                <div>
                     <span>
                         <div>
                             {profile && <img src={profile.avatar}
                                              alt={"avatar"}/>}
                         </div>
                         <span>
                             {profile && <div>
                                 {profile.name}
                             </div>}
                         </span>
                     </span>
                </div>
            </div>
        )

    }
)