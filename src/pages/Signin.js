/*import React from "react";
import { Fragment } from "react";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SignInForm from "../components/SignInForm";

import "./signin.css";

function SignIn() {
  return (
    <Fragment>
      <NavBar />
      <main className="main bg-dark">
        <SignInForm />
      </main>
      <Footer />
    </Fragment>
  );
}

export default SignIn;*/

import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import { login } from "../features/User/sliceUtilisateur";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import "./signin.css";

export default function Connexion() {
  const [donnees, dataModif] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [erreur, setErreur] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sendLogin = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3001/api/v1/user/login";
      const { data: res } = await axios.post(url, donnees);
      dispatch(login({ ...res, token: res.body.token }));
      if (rememberMe) {
        localStorage.setItem("JWTutilisateur", JSON.stringify(res.body.token));
      }
      navigate("/profil");
    } catch (error) {
      setErreur(error.message);
    }
  };

  return (
    <div className="mainLogin">
      <NavBar />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={sendLogin}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="email"
                name="email"
                id="username"
                onChange={(event) =>
                  dataModif({
                    ...donnees,
                    [event.target.name]: event.target.value,
                  })
                }
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(event) =>
                  dataModif({
                    ...donnees,
                    [event.target.name]: event.target.value,
                  })
                }
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                onClick={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {erreur && (
              <div className="erreurConnexion">{"Error : " + erreur}</div>
            )}
            <input type="submit" value="Sign In" className="sign-in-button" />
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
