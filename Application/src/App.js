import "./App.css";
import React from "react";
import getLocalStorage, { getUserApiData } from "./Components/Common";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePost from "./Components/CreatePost";

import Home from "./Components/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={getLocalStorage("user-id") ? <Home /> : <Login />} />
          <Route path="/home" element={<Home />} >
            {/* <Route path="list" element={<List />} /> */}
          </Route>

          <Route path="/Authentication/SignUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
