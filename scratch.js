const axios = require('axios');

const BASE_URL = `http://localhost:4000`;

const test = async () => {
  try {
    const resp = await axios.post(`${BASE_URL}/users/id/1/albums`, {
      title: 'newAlbum',
      genre: 'tester',
    });
    console.log(resp.data);
  } catch(e) {
    console.log(e);
  }
}

test();
