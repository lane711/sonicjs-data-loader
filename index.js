const axios = require("axios");
const { faker } = require("@faker-js/faker");

axios.defaults.baseURL = "http://127.0.0.1:8788/v1";
customConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

var users = [];
var categories = [];
var posts = [];
var comments = [];

//user - 250k
//category - 100k
//post - 500k, with 4 categories, 2 comments
//comments - 1M

const userCount = 0;
const categoryCount = 1;

for (let index = 0; index < userCount; index++) {
  createUser();
}

for (let index = 0; index < categoryCount; index++) {
  createCategory();
}

//user

function createUser() {
  const data = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: "user",
    table: "users"
  };

  axios
    .post(`/content`, { data }, customConfig)
    .then(function (response) {
      users.push(data);
      console.log(response.status);
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// category
function createCategory() {
  const data = {
    title: faker.lorem.words(2),
    body: faker.lorem.words(350),
    table: "category",
  };

  axios
    .post(`/content`, { data }, customConfig)
    .then(function (response) {
      categories.push(data);
      console.log(response.status);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// post
function createPost(userId) {
  const data = {
    title: faker.lorem.lines(),
    body: faker.lorem.words(1000),
    userId: userId,
    table: "category",
  };

  axios
    .post(`/content`, { data }, customConfig)
    .then(function (response) {
      posts.push(data);
      console.log(response.status);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// comment
function createComment(userId, postId) {
  const data = {
    body: faker.lorem.words(200),
    userId: userId,
    postId: postId,
    table: "comments",
  };

  axios
    .post(`/content`, { data }, customConfig)
    .then(function (response) {
      comments.push(data);
      console.log(response.status);
    })
    .catch(function (error) {
      console.log(error);
    });
}
