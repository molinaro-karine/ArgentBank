import React, { useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import UserCard from "../components/UserCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { accounts } from "../datas/Accounts";
import { setUser, updateUser } from "../features/User/sliceUser";

import "./profile.css";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [chargement, setChargement] = useState(false);
  const [edition, setEdition] = useState(false);
  const [valeurs, setValeurs] = useState({});
  const user = useSelector((state) => state.user);
  const token = user.token || JSON.parse(localStorage.getItem("JWTuser"));
  const refFirstName = useRef("");
  const refLastName = useRef("");

  const clicEditName = () => {
    setEdition(!edition);
    setValeurs({
      ...valeurs,
      firstName: user.firstName,
      lastName: user.lastName,
    }); // Pour avoir une valeur quand rien n'est entré
  };

  const modifName = (e) => {
    setValeurs({ ...valeurs, [e.target.name]: e.target.value });
  };

  const modifUser = async (token, firstName, lastName) => {
    try {
      const res = await axios.put(
        `http://localhost:3001/api/v1/user/profile`,
        { token, firstName, lastName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const datasUser = JSON.stringify(res.data.body);
      return JSON.parse(datasUser);
    } catch (e) {
      if (e.res) {
        throw new Error(e.res.data.message);
      }
      throw new Error(`Error: ${e.message}`);
    }
  };

  const newName = async (e) => {
    e.preventDefault();
    if (
      valeurs.firstName === user.firstName &&
      valeurs.lastName === user.lastName
    ) {
      setEdition(!edition);
      refFirstName.current = "";
      refLastName.current = "";
      return;
    }
    try {
      setChargement(true);
      const res = await modifUser(token, valeurs.firstName, valeurs.lastName);
      dispatch(updateUser(res));
      setChargement(false);
      setEdition(false);
    } catch (e) {
      console.log(e.message);
    } finally {
      refFirstName.current = "";
      refLastName.current = "";
    }
  };

  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
    const datasUser = async () => {
      setChargement(true);
      try {
        const { data: res } = await axios.post(
          "http://localhost:3001/api/v1/user/profile",
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(
          setUser({
            ...res,
            email: res.body.email,
            firstName: res.body.firstName,
            lastName: res.body.lastName,
          })
        );
        setChargement(false);
      } catch (e) {
        if (e.response) {
          throw new Error(e.response.data.message);
        }
        throw new Error(`Erreur: ${e.message}`);
      }
    };
    datasUser();
  }, [navigate, dispatch, token]);
  //envoiNouveauNom :newName
  return (
    <div className="mainProfil">
      <NavBar />
      {chargement ? (
        <div>Chargement...</div>
      ) : (
        <main className="main bg-dark">
          {edition ? (
            <div className="header">
              <h1>Edit your Name :</h1>
              <form onSubmit={newName}>
                <div className="input-wrapper">
                  <label htmlFor="firstName"></label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder={user.firstName}
                    ref={refFirstName}
                    onChange={modifName}
                    className="account"
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="lastName"></label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder={user.lastName}
                    ref={refLastName}
                    onChange={modifName}
                    className="account"
                  />
                </div>
                <button className="edit-button">Change Name</button>
              </form>
            </div>
          ) : (
            <div className="header">
              <h1 className="titreProfil">
                Welcome back
                <br /> {user.firstName} {user.lastName}!
              </h1>
              <button className="edit-button" onClick={clicEditName}>
                Edit Name
              </button>
            </div>
          )}

          <h2 className="sr-only">Accounts</h2>
          {accounts.map((account, index) => {
            return (
              <UserCard
                key={index}
                title={account.title}
                amount={account.amount}
                description={account.description}
              />
            );
          })}
        </main>
      )}
      <Footer />
    </div>
  );
}

export default Profile;
