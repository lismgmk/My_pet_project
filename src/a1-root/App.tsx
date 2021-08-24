import React from "react";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";
import style from "../app/App.module.css";
import Main from "./v1-Main/Main";
import Registration from "./v3-Registration/Registration";
import {Login} from "./v2-Login/Login";
import RebildPassword from "./v6-Rebild_password/RebildPassword";
import Page404 from "./v5-Page_404/Page404";
import NewPassword from "./v7-New_password/NewPassword";
import {Profile} from "./v4-Profile/Profile";

function App() {
  return (
    <>
      <div className={style.App}>
        <NavLink to={PATH.PET_MAIN} activeClassName={style.activeLink}>
          Main
        </NavLink>
        <NavLink to={PATH.PET_LOGIN} activeClassName={style.activeLink}>
          Login
        </NavLink>
        <NavLink to={PATH.PET_REISTRATION} activeClassName={style.activeLink}>
          Registration
        </NavLink>
        <NavLink to={PATH.PET_PROFILE} activeClassName={style.activeLink}>
          Profile
        </NavLink>
        <NavLink to={PATH.PET_PAGE404} activeClassName={style.activeLink}>
          Page_404
        </NavLink>
        <NavLink
          to={PATH.PET_REBILD_PASSWORD}
          activeClassName={style.activeLink}
        >
          Rebild_password
        </NavLink>
        <NavLink to={PATH.PET_NEW_PASSWORD} activeClassName={style.activeLink}>
          New_password
        </NavLink>
      </div>
      <Switch>
        <Route
          path={PATH.PET_NULL}
          exact
          render={() => <Redirect to={PATH.PET_MAIN} />}
        />

        <Route exact path={PATH.PET_MAIN} render={() => <Main />} />
        <Route exact path={PATH.PET_LOGIN} render={() => <Login />} />
        <Route
          exact
          path={PATH.PET_REISTRATION}
          render={() => <Registration />}
        />
        <Route exact path={PATH.PET_PROFILE} render={() => <Profile />} />
        <Route exact path={PATH.PET_PAGE404} render={() => <Page404 />} />
        <Route
          exact
          path={PATH.PET_REBILD_PASSWORD}
          render={() => <RebildPassword />}
        />
        <Route
          exact
          path={PATH.PET_NEW_PASSWORD}
          render={() => <NewPassword />}
        />

        <Redirect from={"*"} to={PATH.PET_PAGE404} />
      </Switch>
    </>
  );
}

export default App;

export const PATH = {
  PET: "/",
  PET_MAIN: "/My-pet-progect/main",
  PET_LOGIN: "/My-pet-progect/login",
  PET_REISTRATION: "/My-pet-progect/registration",
  PET_PROFILE: "/My-pet-progect/profile",
  PET_PAGE404: "/My-pet-progect/page404",
  PET_REBILD_PASSWORD: "/My-pet-progect/rebild-password",
  PET_NEW_PASSWORD: "/My-pet-progect/new-password",
  PET_NULL: "/",
};
