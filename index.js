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
//post - 500k
//comments - 1M

const userCount = 1;

for (let index = 0; index < userCount; index++) {
  createUser();
}

//user

function createUser() {
  const data = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: "user",
    table: "users",
    submit: true,
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
  const category = {
    title: faker.lorem.lines(),
    body: faker.lorem.words(350),
    table: "category",
  };

  axios
    .post(`/content`, { category }, customConfig)
    .then(function (response) {
      categories.push(category);
      console.log(response.status);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// post
function createPost(userId) {
  const post = {
    title: faker.lorem.lines(),
    body: faker.lorem.words(1000),
    userId: userId,
    table: "category",
  };

  axios
    .post(`/content`, { post }, customConfig)
    .then(function (response) {
      posts.push(post);
      console.log(response.status);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// comment
function createComment(userId, postId) {
  const comment = {
    body: faker.lorem.words(200),
    userId: userId,
    postId: postId,
    table: "comments",
  };

  axios
    .post(`/content`, { comment }, customConfig)
    .then(function (response) {
      comments.push(comments);
      console.log(response.status);
    })
    .catch(function (error) {
      console.log(error);
    });
}
