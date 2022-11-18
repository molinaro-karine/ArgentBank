import React from "react";
import { accounts } from "../datas/Accounts";
// styles
import NavBar from "../components/NavBar";
import UserCard from "../components/UserCard";
import Footer from "../components/Footer";

import "./profile.css";

function ProfilePage() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="main bg-dark">
        <div>
          <h1>
            Welcome back
            <br />
            Tony Jarvis!
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
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
      <Footer />
    </React.Fragment>
  );
}

export default ProfilePage;
