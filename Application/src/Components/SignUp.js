import React from "react";
import { Link } from "react-router-dom";
import { postUserApidata, validEmail } from "./Common";

export default function SignUp() {
  console.log(postUserApidata());

  const submitHandelSignUp = (e) => {
    e.preventDefault();
    let SignUpFlag = true;
    const regEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    for (let i = 0; i < e.target.elements.length - 1; i++) {
      if (e.target.elements[i].type == "text") {
        if (e.target.elements[i].value.length < 2) {
          e.target.elements[i].classList.add("is-invalid");
          SignUpFlag = false;
        } else {
          e.target.elements[i].classList.remove("is-invalid");
          e.target.elements[i].classList.add("is-valid");
        }
      }
      if (
        e.target.elements[i].type == "password" ||
        e.target.elements[i].type == "number"
      ) {
        if (e.target.elements[i].value.length < 5) {
          e.target.elements[i].classList.add("is-invalid");
          SignUpFlag = false;
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
          SignUpFlag = false;
        }
      }
    }

    if (SignUpFlag) {
      let raw = {
        name: e.target.elements[0].value,
        email: e.target.elements[1].value,
        gender: e.target.elements[2].value,
        status: "active",
      };
      postUserApidata(raw)
        .then((res) => {
          res = JSON.parse(res);
          alert("your user-id : " + res.id + "\n your Email is : " + res.email);
          e.target.classList.remove("is-valid");
          e.target.reset();
        })
        .catch((err) =>
          err.response.data[0].message == "has already been taken"
            ? alert("You have already account with this Email")
            : ""
        );
    }
  };

  return (
    <div className="container">
      <div className="row border p-2 p-md-5 gap-5 mt-5 ">
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

        <div className="col-lg-6 border rounded p-5">
          {" "}
          <h3 className="border-bottom">Sign Up</h3>
          <form className="mt-5" onSubmit={submitHandelSignUp}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>

              <input type="text" className="form-control" id="name" required/>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>

              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={validEmail}
              />

              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>

            <label htmlFor="exampleInputEmail1" className="form-label">
              Gender:
            </label>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="male"
                required
              />

              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Male
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                value="female"
                type="radio"
                name="gender"
                id="flexRadioDefault2"
              />

              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Female
              </label>
            </div>

            <div className="mb-3 mt-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>

              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                required
              />
            </div>

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
              Submit
            </button>
          </form>
          <p className="text-center text-muted mt-5 mb-0">
            Have already an account?{" "}
            <Link to="/">
              <u className="fw-bold  text-primary">Login here</u>
            </Link>
          </p>
          <div></div>
        </div>
      </div>
    </div>
  );
}
