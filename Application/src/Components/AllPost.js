import React, {useEffect,useState } from "react";
import PostCard from "./PostCard";
import { getPostsApiData,Token } from "./Common";
import { Routes, Route, useParams } from 'react-router-dom';



const AllPost = () => {
  let { userId } = useParams();

    


  const [user, setUsers] = useState([]);
  const [post, setPost] = useState([]);
  const [personalPost, setpersonalPost] = useState([]);
  const [Comments, setComments] = useState([]);



  useEffect(() => {
    getPostsApiData()
      .then((res) => {
        setPost(res);
        const userId=localStorage.getItem("user-id");
        setpersonalPost(()=>res.filter((post) => post.user_id==userId))
      })
      .catch((err) => console.log(err.response));
  }, []);
  


  return (
    <div className=" mx-auto mb-5 " style={{marginTop:'100px'}}>
      {personalPost.map((d, index) => {


        return (
          <PostCard
            post={d}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default AllPost;
