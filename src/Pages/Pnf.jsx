import React from "react";
import { Link } from "react-router-dom";

function Pnf() {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <h1 className="display-1 text-danger mb-3">404</h1>
      <h2 className="mb-3 text-secondary">Oops! Page Not Found</h2>
      <p className="mb-4 text-muted text-center">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/">
        <button className="btn btn-primary btn-lg">⬅ Go Back Home</button>
      </Link>
    </div>
  );
}

export default Pnf;
