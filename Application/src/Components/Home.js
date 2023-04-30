import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import AllPost from "./AllPost";
import CreatePost from "./CreatePost";


const Home = () => {
 
  return (
      <div>
        <Header></Header>
        <AllPost />
        {/* <CreatePost/> */}
      </div>
  );
};

export default Home;
