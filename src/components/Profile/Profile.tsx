import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { ResponseType } from '../../api/LoginAPI';
import { AppRootStateType } from '../../app/store';
import defaultAvatar from '../../assets/images/defaultAvatar.png';
import { SuperSmallButton } from '../../common/c3-SuperSmallButton/SuperSmallButton';
import { SuperPaper } from '../../common/c7-SuperPaper/SuperPaper';
import { setPacksListTC } from '../../reducers/r9-PacksReducer';
import { PacksTable } from '../Forgot/table/PacksTable';
import style from './Profile.module.css';

type ProfilePropsType = {
	isPrivate: boolean;
};

export const Profile: React.FC<ProfilePropsType> = ({ isPrivate }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const profile = useSelector<AppRootStateType, ResponseType>(
		(state) => state.signIn.profile
	);
	const {
		cardPacks,
		page,
		pageCount,
		minCardsCount,
		maxCardsCount,
		sortPacks,
		cardPacksTotalCount,
		searchPackName,
	} = useSelector((state: AppRootStateType) => state.packs);
	const [isPrivatePacks, setIsPrivatePacks] = useState<boolean>(false);

	useEffect(() => {
		if (isPrivate) {
			dispatch(
				setPacksListTC(
					profile._id,
					pageCount,
					page,
					'',
					minCardsCount,
					maxCardsCount,
					sortPacks
				)
			);
		} else {
			dispatch(
				setPacksListTC(
					undefined,
					pageCount,
					page,
					'',
					minCardsCount,
					maxCardsCount,
					sortPacks
				)
			);
		}
	}, []);

	if (!profile._id) {
		return <Redirect to={'/log_in'} />;
	}

	return (
		<SuperPaper>
			<div className={style.aboutMe}>
				<div className={style.personal}>
					<img
						className={style.avatar}
						src={profile.avatar ? profile.avatar : defaultAvatar}
						alt='avatar'
					/>
					<div className={style.name}>Petr Ivanov</div>
					<div className={style.description}>Front-end developer</div>
					<SuperSmallButton text={'Edit profile'} />
				</div>
			</div>
			<div className={style.packsTable}>
				<PacksTable header={'My packs list'} isPrivate={isPrivate} />
			</div>
		</SuperPaper>
	);
};
