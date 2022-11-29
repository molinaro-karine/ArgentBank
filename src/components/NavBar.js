import React from "react";
import logo from "../assets/argentBankLogo.png";
import "./navBar.css";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/User/sliceUser";

function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const signOut = () => {
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <Link to="/">
        <img className="main-nav-logo-image" src={logo} alt="logo" />
      </Link>
      <h1 className="sr-only">Argent Bank</h1>

      <div>
        {user.connected ? (
          <div className="profilNav">
            {window.location.href.indexOf("profil") > -1 ? (
              <div className="main-nav-item">
                <i className="fa fa-user-circle"></i>
                {user.firstName}
              </div>
            ) : (
              <NavLink className="main-nav-item" to="profil">
                <i className="fa fa-user-circle"></i>
                {user.firstName}
              </NavLink>
            )}
            <NavLink className="main-nav-item" to="" onClick={signOut}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </NavLink>
          </div>
        ) : (
          <NavLink className="main-nav-item" to="login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
