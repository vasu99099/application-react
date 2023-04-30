import React, { useEffect, useState } from "react";
import { getCommentsApiData, getUserApiData, Token,validText } from "./Common";
import axios from "axios";


const PostCard = (props) => {
  const post = props.post;
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [user, setUser] = useState({});
  const [comments, setComments] = useState({});
  const [showcomments, setShowcomments] = useState(false);
  const likeHandel = () => {
    setLike(!like);
  };

  useEffect(() => {
    getUserApiData(post.user_id)
      .then((res) => { setUser(res); })


    getCommentsApiData(post.id)
      .then((res) => { setComments(res); })
  }, [])


  function postCommentsApidata(raw) {
const data={...raw};
delete raw.post_id;
console.log(raw);
    var config = {
      method: "POST",
      url: "https://gorest.co.in/public/v2/posts/" + data.post_id + "/comments",
      headers: {
        Authorization: Token,
      },
      data: raw,
    };


    axios(config)
      .then(function (response) {
        setComments([...comments,data])
      })

  }


const submitComments=(e)=>{
e.preventDefault();
const data={};
if(e.target.elements[0].value!=''){

console.log();
data.post_id=e.target.elements[1].value;
data.body=e.target.elements[0].value;
data.email=localStorage.getItem("email");
data.name=localStorage.getItem("name");
postCommentsApidata(data);
e.target.reset();
}


}


  return (
    <div className="">
      <section className="main ">
        <div className="wrapper">
          <div className="left-col">
            <div className="post mx-auto">
              <div className="info">
                <div className="user">
                  <div className="profile-pic">
                    <i className="fa-solid fa-circle-user fa-2x"></i>
                  </div>
                  <p className="username ">{user.name ? user.name : ''}</p>
                </div>
                <img
                  src="application/src/Images/cover-1.png"
                  className="options"
                  alt=""
                />
              </div>
              <div className="p-3 border border-dark">{post.body}</div>
              <div className="post-content">
                <div className="reaction-wrapper d-flex justify-content-between">
                  <div>
                    <span className="me-3" onClick={() => likeHandel()}>
                      {!like ? (
                        <i className="fa-regular fa-heart fa-lg"></i>
                      ) : (
                        <i
                          className="fa-solid fa-heart fa-lg"
                          style={{ color: "#d71d1d" }}
                        ></i>
                      )}
                    </span>
                    <span className="me-3" onClick={() => setShowcomments(!showcomments)}>
                      <i className="fa-regular fa-comment fa-lg"></i>
                    </span>
                    <span className="me-3">
                      <i className="fa-regular fa-paper-plane fa-lg"></i>
                    </span>
                  </div>
                  <div>
                    <span
                      className="me-3"
                      onClick={() => setBookmark(!bookmark)}
                    >
                      {!bookmark ? (
                        <i className="fa-regular fa-bookmark fa-lg"></i>
                      ) : (
                        <i
                          className="fa-solid fa-bookmark fa-lg"
                          style={{ color: "#000000" }}
                        ></i>
                      )}
                    </span>
                  </div>
                </div>
                <p className="likes">1,012 likes</p>
                <p className="description">
                  <span>{comments.length > 0 ? comments[0].name : ''} </span>{comments.length > 0 ? comments[0].body : ''}

                  {
                    comments.length > 0 && showcomments ? comments.map((c, index) => {
                      if (index != 0) {
                        return (
                          <div className="mt-1">
                            <span>{c.name}</span>{c.body}
                          </div>
                        )
                      }
                    }) : ''
                  }
                  {comments.length > 0 ? <a className=" btn nav-link text-start ps-0" onClick={() => setShowcomments(!showcomments)}>{showcomments ? "hide" : "show more"}</a> : "no Comments"}
                </p>
                <p className="post-time">2 minutes ago</p>
              </div>

              <form onSubmit={submitComments}>

                <div className="comment-wrapper">
                  <img src="img/smile.PNG" className="icon" alt="" />
                  <input
                    type="text"
                    className="comment-box"
                    placeholder="Add a comment"
                  />
                  <button  type="submit"   className="comment-btn" value={post.id}>post</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostCard;
