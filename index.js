const axios = require("axios");
const { faker } = require("@faker-js/faker");

const axiosInstance = axios.create({
  baseURL: "https://api.example.com",
  proxy: false,
});

axiosInstance.defaults.baseURL = "http://localhost:4321/api/v1";
// axiosInstance.defaults.baseURL = "https://27a58f99.sonicjs-emq.pages.dev/v1";
// axiosInstance.defaults.baseURL = "https://demo.sonicjs.com/v1";

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
//category - 250k
//post - 500k, with 4 categories, 2 comments
//comments - 1M

const userCount = 30;
const categoryCount = 1;
const postCount = 5;
const commentCount = 15;
const categoryToPost = 2;

var userCountCreated = 0;

async function start() {
  // for (let index = 0; index < userCount; index++) {
  if (userCountCreated < userCount) {
    await createUser();
    userCountCreated++;
  } else {
    console.log("done");
    clearInterval(interval);
  }
  // sleep(2000);
  // }
}

//user
async function createUser() {
  const data = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: "user",
  };

  axiosInstance
    .post(`/users`, { data }, customConfig)
    .then(async function (response) {
      users.push(data);
      console.log("user", response.status, response.data.data.id);
      const userId = response.data.data.id;
      if (userId) {
        for (let index = 0; index < categoryCount; index++) {
          await createCategory(userId);
        }
      }
    })
    .catch(function (error) {
      console.log(error?.data?.message);
    });
}

// category
async function createCategory(userId) {
  const data = {
    title: toTitleCase(faker.lorem.words(2)),
    body: faker.lorem.words(350),
  };

  axiosInstance
    .post(`/categories`, { data }, customConfig)
    .then(async function (response) {
      categories.push(data);
      console.log("category", response.status, response.data.data.id);
      const categoryId = response.data.data.id;
      for (let index = 0; index < postCount; index++) {
        await createPost(userId, categoryId);
      }
    })
    .catch(function (error) {
      console.log(error?.data?.message);
    });
}

// post
async function createPost(userId, categoryId) {
  const data = {
    title: toTitleCase(faker.lorem.words(5)),
    body: faker.lorem.words(1000),
    userId: userId,
  };

  axiosInstance
    .post(`/posts`, { data }, customConfig)
    .then(async function (response) {
      posts.push(data);
      console.log("post", response.status, response.data.data.id);
      const postId = response.data.data.id;

      for (let index = 0; index < commentCount; index++) {
        await createComment(userId, postId);
      }
      for (let index = 0; index < categoryToPost; index++) {
        await createCategoryToPost(postId, categoryId);
      }
    })
    .catch(function (error) {
      console.log(error?.data?.message);
    });
}

// comment
async function createComment(userId, postId) {
  console.log("createComment", userId, postId);
  const data = {
    body: faker.lorem.words(200),
    userId: userId,
    postId: postId,
  };

  axiosInstance
    .post(`/comments`, { data }, customConfig)
    .then(function (response) {
      console.log("comment", response.status, response.data.data.id);
      console.log(response.status);
    })
    .catch(function (error) {
      console.log(error?.data?.message);
    });
}

// category to post
async function createCategoryToPost(postId, categoryId) {
  console.log("createCategoryToPost", postId, categoryId);
  const data = {
    categoryId,
    postId,
  };

  axiosInstance
    .post(`/categories-to-posts`, { data }, customConfig)
    .then(function (response) {
      console.log("createCategoryToPost", response.status, response.data.data.id);
      console.log(response.status);
    })
    .catch(function (error) {
      console.log(error?.data?.message);
    });
}

function sleep(miliseconds) {
  console.log("sleepting", miliseconds);
  var currentTime = new Date().getTime();

  while (currentTime + miliseconds >= new Date().getTime()) {}
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

let interval = setInterval(start, 5000);
