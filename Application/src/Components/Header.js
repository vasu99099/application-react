import React from "react";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate();

  const logoutHandel = () => {
    localStorage.removeItem("user-id");
    navigate('/')
  };
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mt-2 w-75 mx-auto fixed-top">
        <div className="container-fluid ">
          <a className="navbar-brand me-5" href="#">
          <span className="text-white mt-4 fs-4" style={{ fontFamily: "Pacifico" }}>
            VIstagram
          </span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Your Post
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link "
                  href="#"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Create Post
                </a>
              </li>
            </ul>
            <div>
                <span className="text-white me-2 fs-5 fw-bold">Welcome</span>

              <button className="btn btn-success" onClick={logoutHandel}>
                LogOut
              </button>
            </div>
            {/* <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
