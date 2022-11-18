import React from "react";
import logo from "../assets/argentBankLogo.png";
import "./navBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="main-nav">
      <Link to="/">
        <img className="main-nav-logo-image" src={logo} alt="logo" />
      </Link>
      <h1 className="sr-only">Argent Bank</h1>

      <div>
        <Link to={"/login"} className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
