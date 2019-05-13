import axios from 'axios';

//////////////////////////////////////////////////////
//Might be worth creating different axios apis for each route
//The order of everthing has been moved to read, create, update, destroy
//We have put for creating, but update edit for put we need to decide naming scheme
//////////////////////////////////////////////////////

// const BASE_URL = 'https://mighty-thicket-27112.herokuapp.com';
const BASE_URL = "http://localhost:4000"

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    authorization: `Bearer ${localStorage.getItem('authToken')}`,
  }
});

const updateToken = (token) => {
  localStorage.setItem('authToken', token);
  api.defaults.headers.common.authorization = `Bearer ${token}`;
};

//////////////////////////////////////////////////////
//Users section
//////////////////////////////////////////////////////


const postUser = async (user) => {
  try {
    const resp = await api.post(`/users`, user);
    updateToken(resp.data.token);
    return resp.data;
  } catch(e) {
    console.error(e);
  };
};

const loginUser = async (user) => {
  try {
    const resp = await api.post(`/users/login`, user);
    updateToken(resp.data.token);
    return resp.data;
  } catch(e) {
    console.error(e);
  };
};

//changed name of function to get all users
const getUsers = async () => {
  try {
    const resp = await api(`/users`);
    return resp.data;
  } catch(e) {
    console.error(e);
  };
};

const getUser = async (userId) => {
  try {
    const resp = await api(`/users/user-id/${userId}`);
    return resp.data;
  } catch(e) {
    console.error(e);
  };
};

// need update and destroy users in user section

//////////////////////////////////////////////////////
//Music section
//////////////////////////////////////////////////////

const getUserMusic = async (userId) => {
  try {
    const resp = await api(`/users/user-id/${userId}/music`);
    return resp.data
  } catch(e) {
    console.error(e);
  };
};

//////////////////////////////////////////////////////
//Albums Section
//////////////////////////////////////////////////////

//changed slug and name of artist to user
const getUserAlbums = async (userId) => {
  try {
    const resp = await api(`/uers/user-id/${userId}/albums`);
    return resp.data;
  } catch(e) {
    console.error(e);
  };
};

//changed slug, path, and moved to keep concerns together
const postAlbum = async (formData) => {
  try {
    const resp = await axios.post(`${BASE_URL}/create-album`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });
    return resp.data;
  } catch(e) {
    console.log(e);
  }
};

//get specific album
const getAlbum = async (userId, albumId) => {
  try {
    const resp = await api(`users/user-id/${userId}/albums/album-id/${albumId}`)
    return resp.data;
  } catch(e) {
    console.error(e);
  };
};

//changed slug, path, moved
const editAlbum = async (userId, albumId, updatedAlbum) => {
  try {
    const resp = await api.put(`/users/user-id/${userId}/albums/album-id/${albumId}`, updatedAlbum);
    return resp.data;
  } catch(e) {
    console.error(e);
  };
};

//I moved this so all concerns are together changed slug changed destroy to delete
const deleteAlbum = async (userId, albumId) => {
  try {
    const resp = await api.delete(`users/user-id/${userId}/albums/album-id/${albumId}`);
    return resp.data;
  } catch(e) {
    console.error(e);
  };
};

//////////////////////////////////////////////////////
//Songs section
//////////////////////////////////////////////////////

//changed file path and moved to ensure all concerns are together
const getAlbumSongs = async (userId, albumId) => {
  try {
    const resp = await api(`/users/user-id/${userId}/albums/album-id/${albumId}/songs`);
    return resp.data;
  } catch(e) {
    console.error(e);
  };
};

//created this call for edit
const editSong = async (userId, albumId, songId, updatedSong) => {
  try {
    const resp = await api.put(`users/user-id/${userId}/albums/album-id/${albumId}/songs/song-id/${songId}`, updatedSong);
    return resp.data;
  } catch(e) {
    console.error(e);
  };
};

//changed arguments, path, changed destroy to delete
const deleteSong = async (userId, albumId, songId) => {
  try {
    const resp = await api.delete(`/users/user-id/${userId}/albums/album-id/${albumId}/songs/song-id/${songId}`);
    return resp;
  } catch(e) {
    console.error(e);
  };
};

//////////////////////////////////////////////////////
//AWS Section
//////////////////////////////////////////////////////

const postSong = async (formData) => {
  try {
    const resp = await axios.post(`${BASE_URL}/create-song`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });
    return resp.data;
  } catch(e) {
    console.log(e);
  }
}

//changed names and order to match
export {
  updateToken,
  postUser,
  loginUser,
  getUsers,
  getUser,
  getUserMusic,
  getUserAlbums,
  postAlbum,
  getAlbum,
  editAlbum,
  deleteAlbum,
  getAlbumSongs,
  postSong,
  editSong,
  deleteSong,
}
