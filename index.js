const axios = require("axios");

const baseUrl = "http://127.0.0.1:8788/v1";

const data = {
  firstName: "wqer",
  lastName: "qwer",
  email: "ldc0618aaaa@gmail.com",
  password: "qwerwqre",
  role: "admin",
  table: "users",
  submit: true,
};

const dataString = JSON.stringify(data);
customConfig = {
    headers: {
    'Content-Type': 'application/json'
    }
};

axios
  .post(`${baseUrl}/content`, {data}, customConfig)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
