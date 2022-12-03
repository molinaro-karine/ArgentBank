import { Link } from "react-router-dom";
import React from "react";

import "./error404.css";

function Error404() {
  return (
    <section className="not-found">
      <div>
        <h1 className="not-found_title">404</h1>
        <h2 className="not-found_subtitle">
          Whoops ! The page you requested does not exist.
        </h2>
      </div>

      <Link to="/" className="not-found_link">
        Return to the home page
      </Link>
    </section>
  );
}

export default Error404;
