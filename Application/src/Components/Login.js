import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  getUserApiData,
  generateOTP,
  validEmail,
  validPassword,
  setUserData,
} from "./Common";
import { useNavigate } from "react-router-dom";

export default function Login({ setAuthentication }) {
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);
  const [OTP, setOTP] = useState(["", ""]);
  const OTPHandel = (e) => {
    let arr = [...OTP];
    arr[1] = e.target.value;
    setOTP(arr);

    if (arr[0] == arr[1]) {
      e.target.classList.remove("is-invalid");
      e.target.classList.add("is-valid");
    } else {
      e.target.classList.add("is-invalid");
    }
  };

  const handelLogin = (e) => {
    e.preventDefault();
    const regEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    let SubmitFlag = 1;
    for (let i = 0; i < e.target.elements.length - 2; i++) {
      if (
        e.target.elements[i].type == "password" ||
        e.target.elements[i].type == "number"
      ) {
        if (e.target.elements[i].value.length < 5) {
          e.target.elements[i].classList.add("is-invalid");
          SubmitFlag = 0;
        } else {
          e.target.elements[i].classList.remove("is-invalid");
          e.target.elements[i].classList.add("is-valid");
        }
      }
      if (e.target.elements[i].type == "email") {
        if (regEmail.test(e.target.elements[i].value)) {
          e.target.elements[i].classList.remove("is-invalid");
          e.target.elements[i].classList.add("is-valid");
        } else {
          e.target.elements[i].classList.add("is-invalid");
          SubmitFlag = 0;
        }
      }
    }

    if (SubmitFlag == 1) {
      getUserApiData(e.target.elements[0].value)
        .then((res) => {
          if (res.email === e.target.elements[1].value) {
      localStorage.setItem("name", res.name);

            setValid(true);
            if (!valid) {
              let otp = generateOTP();
              console.log(otp);
              setOTP([otp, ""]);
            }
            
          } else {
            alert("Please Enter a valid detail");
          }
        })
        .catch((err) => console.log(err.response));
    }
  };

  getUserApiData()
  .then((res) => {
    console.log(res);
  })

  const validOTPSubmit = (e) => {
    e.preventDefault();
    if (OTP[0] == e.target.elements[4].value) {
      localStorage.setItem("user-id", e.target.elements[0].value);
      localStorage.setItem("email", e.target.elements[1].value);
      navigate("/home");
    }
  };

  return (
    <div className="container">
      <div className="row border p-2 p-md-5 gap-5 mt-5">
        <div
          className="col-lg-4 border rounded text-center align-center d-none d-lg-block"
          style={{
            height: "700px",
            background:
              "linear-gradient(180deg, rgba(44,3,68,1) 0%, rgba(83,3,80,1) 1%, rgba(130,2,119,1) 37%, rgba(255,0,134,1) 100%)",
          }}
        >
          <img
            src="https://www.edigitalagency.com.au/wp-content/uploads/new-Instagram-logo-white-glyph.png"
            style={{ marginTop: "200px" }}
            width={80 + "px"}
            alt=""
          />

          <h1 className="text-white mt-4" style={{ fontFamily: "Pacifico" }}>
            VIstagram
          </h1>
        </div>

        <div className="col-lg-6 border rounded p-3 p-md-5">
          <h3 className="border-bottom">Log In</h3>

          <form
            className="mt-5"
            onSubmit={valid ? validOTPSubmit : handelLogin}
          >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                user Id :
              </label>

              <input
                type="number"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>

              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                onChange={(e) => validEmail(e)}
              />

              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="mb-3 mt-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>

              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => validPassword(e, 5)}
              />
            </div>
            <div className="row justify-content-between  mb-4">
              <div className="form-check mb-0 col-12 col-md-6">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  value=""
                  id="form2Example3"
                  dfaultchecked="true"
                />
                <label className="form-check-label" htmlFor="form2Example3">
                  Remember me
                </label>
              </div>
              <a href="#!" className="text-body col-12 col-md-6">
                Forgot password?
              </a>
            </div>

            {valid && (
              <div className="my-5 w-50 mx-auto">
                {OTP[0]}
                <label className="me-2">Enter OTP : </label>
                <input
                  type="text"
                  className="form-control fs-4 "
                  value={OTP[1]}
                  onChange={OTPHandel}
                  maxLength={4}
                />
              </div>
            )}
            <button
              className="px-5 py-2 rounded fw-bold"
              type="submit"
              style={{
                background:
                  "linear-gradient(180deg, rgba(44,3,68,1) 0%, rgba(83,3,80,1) 1%, rgba(130,2,119,1) 37%, rgba(255,0,134,1) 100%)",
                border: "none",
                color: "white",
              }}
            >
              {!valid ? "Submit" : "Verify"}
            </button>
          </form>

          <div className="text-center mt-5">
            <p>
              Not a member? <Link to="/Authentication/SignUp">Sign Up</Link>
            </p>
            <p>or sign up with:</p>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-facebook-f"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-google"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-twitter"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-github"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
