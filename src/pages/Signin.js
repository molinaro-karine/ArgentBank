import React from "react";
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

export default SignIn;
