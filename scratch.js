const axios = require('axios');

const BASE_URL = `http://localhost:4000`;

const test = async () => {
  try {
    const resp = await axios(`${BASE_URL}/users/user-id/1/music`);
    console.log(resp.data);
  } catch(e) {
    console.log(e);
  }
}

test();
