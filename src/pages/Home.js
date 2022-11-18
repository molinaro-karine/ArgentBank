import "./home.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Features from "../components/Features";
import { items } from "../datas/items";

import React from "react";

function Home() {
  return (
    <React.Fragment>
      <NavBar />
      <main>
        <Banner />
        <section className="features">
          <h2 className="sr-only">Features</h2>
          {items.map((items, index) => {
            return (
              <Features
                key={index}
                imgSrc={items.imgSrc}
                title={items.title}
                content={items.content}
                alt={items.alt}
              />
            );
          })}
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default Home;
