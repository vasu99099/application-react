import axios from "axios";

export const Token =
  "Bearer 7d6852fe2f20baf3d3db4645bcac93876350763a6d7c076114ec5313af733d2a";

export default function getLocalStorage(str) {
  return localStorage.getItem(str);
}

export function getUserApiData(id) {
  let data;
  let url = "https://gorest.co.in/public/v2/users";
  if (id) {
    url = "https://gorest.co.in/public/v2/users/" + id;
  }
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: { Authorization: Token },
      })
      .then((response) => {
        resolve(response.data);
      })
     
  });
}
getUserApiData()
export function getPostsApiData(id) {
  let data;
  let url = "https://gorest.co.in/public/v2/posts";
  if (id) {
    url = "https://gorest.co.in/public/v2/posts" + id;
  }
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: { Authorization: Token },
      })
      .then((response) => {
        resolve(response.data);
      })
      
  });
}
export function getCommentsApiData(id) {
  let data;
  let url = "https://gorest.co.in/public/v2/comments";
  if (id) {
    url = "https://gorest.co.in/public/v2/posts/" + id+"/comments";
  }
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: { Authorization: Token },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
  });
}

export function postUserApidata(raw) {
  var config = {
    method: "POST",
    url: "https://gorest.co.in/public/v2/users",
    headers: {
      Authorization: Token,
    },
    data: raw,
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then(function (response) {
        resolve(JSON.stringify(response.data));
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

export const validEmail = (e) => {
  const regEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  if (regEmail.test(e.target.value)) {
    e.target.classList.remove("is-invalid");
    e.target.classList.add("is-valid");
  } else {
    e.target.classList.add("is-invalid");
  }
};
export const validPassword = (e, length) => {
  if (e.target.value.length < length) {
    e.target.classList.add("is-invalid");
  } else {
    e.target.classList.remove("is-invalid");
    e.target.classList.add("is-valid");
  }
};
export const validText = (e) => {
  if (e.target.value.trim()=='') {
    e.target.classList.add("is-invalid");
  } else {
    e.target.classList.remove("is-invalid");
    e.target.classList.add("is-valid");
  }
};

export function generateOTP() {
  let otp = Math.floor(1000 + Math.random() * 9000);
  return otp;
}
