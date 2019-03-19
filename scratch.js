const axios = require('axios');

const BASE_URL = `http://localhost:4000`;

const test = async () => {
  try {
    const resp = await axios.post(`${BASE_URL}/users/login`, {
      artist_name: 'testuserupdated',
      email: 'tester@email',
      password: 'test',
    });
    console.log(resp.data);
  } catch(e) {
    console.log(e);
  }
}

test();
