// run using node migrate.js <password>

const axios = require("axios");

const sourceApiUrl = "https://api.rifeplayer.com/v1";
const destinationApiUrl = "http://localhost:4321/api/v1";
const table = "programs";
const email = "lane@rifeplayer.com";
const password = process.argv[2];

const adminCredentials = {
  email: "lane@rifeplayer.com",
  password: process.argv[2],
};

async function migrateData() {
  try {
    console.log("logging in", email, password);

    // Login to source API and get token
    const loginResponse = await axios.post(`${sourceApiUrl}/auth/login`, {
      email,
      password,
    });
    // console.log('loginResponse:', loginResponse.data);

    const token = loginResponse.data.bearer;
    console.log("Logged in successfully:", token);

    // Get data from source API
    const dataResponse = await axios.get(`${sourceApiUrl}/${table}?limit=1`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    const { data } = dataResponse.data;
    console.log("Data fetched successfully:", data);

    //destination

    // Login to source API and get token
    const loginResponseDestination = await axios.post(
      `${destinationApiUrl}/auth/login`,
      {
        data: {
          email: "demo@demo.com",
          password: "sonicjs!",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log('loginResponse:', loginResponse.data);

    const tokenDestination = loginResponseDestination.data.bearer;
    console.log("Logged in successfully:", tokenDestination);
    return;
    // Post data to destination API
    for (const item of data) {
      console.log("item:", item);
      delete item.id;
      const postResponse = await axios.post(`${destinationApiUrl}/${table}`, {
        data: item,
        headers: {
          Authorization: `Bearer ${tokenDestination}`,
        },
      });
      console.log("Data item migrated successfully:", postResponse.data);
    }

    console.log("Data migrated successfully:", postResponse.data);
  } catch (error) {
    console.error("Error migrating data:", error);
  }
}

migrateData();
