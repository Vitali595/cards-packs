import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {NavLink, Redirect, useHistory} from "react-router-dom";
import style from "./AppBar.module.css"
import {Menu, MenuItem} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {ResponseType} from "../../api/LoginAPI";
import {DisabledButton} from "../../common/c4-DisabledButton/DisabledButton";
import {LogoutTC} from "../../reducers/r2-LoginReducer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export const Header = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const profile = useSelector<AppRootStateType, ResponseType>(state => state.signIn.profile)
    const classes = useStyles();

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const ITEM_HEIGHT = 48;

    type MenuItemComponentProps = {
        title: string,
        path: string
    }
    const MenuItemComponent = (props: MenuItemComponentProps) => {
        return (
            <MenuItem>
                <span className={style.item}>
                    <NavLink to={props.path} activeClassName={style.activeLink}><div>{props.title}</div></NavLink>
                </span>
            </MenuItem>
        )
    }

    const authLogoutHandler = () => {
        dispatch(LogoutTC())
        history.push('/log_in');
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <div>
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: '20ch',
                                },
                            }}
                        >
                            <nav className={style.nav}>
                                <MenuItemComponent title={"Log Up"} path={"/log_up"}/>
                                <MenuItemComponent title={"Log In"} path={"/log_in"}/>
                                <MenuItemComponent title={"Profile"} path={"/profile"}/>
                                <MenuItemComponent title={"Forgot"} path={"/forgot"}/>
                                <MenuItemComponent title={"Set a new password"} path={"/set_new_password/:token"}/>
                                <MenuItemComponent title={"Pack"} path={"/pack"}/>
                                {/*<MenuItem>*/}
                                {/*    <span className={style.item}>*/}
                                {/*        <NavLink to="/set_new_password/:token" activeClassName={style.activeLink}>Set*/}
                                {/*            a*/}
                                {/*            new*/}
                                {/*            password</NavLink>*/}
                                {/*    </span>*/}
                                {/*</MenuItem>*/}
                            </nav>
                        </Menu>
                    </div>
                    <Typography variant="h6" className={classes.title}>
                        Project
                    </Typography>
                    {profile._id
                        ? <DisabledButton variant={'contained'}  title={"Log Out"} callback={authLogoutHandler}/>
                        : <Button type={'submit'}
                                  variant={'contained'}
                                  color={'primary'}
                                  onClick={() => {
                                      return history.push('/log_in')
                                  }}
                        >Login</Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}