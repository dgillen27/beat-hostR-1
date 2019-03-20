import axios from 'axios';

//////////////////////////////////////////////////////
//Might be worth creating different axios apis for each route
//The order of everthing has been moved to read, create, update, destroy
//We have put for creating, but update edit for put we need to decide naming scheme
//////////////////////////////////////////////////////


const api = axios.create({
  baseURL: 'http://localhost:4000'
});

//we will talk about why I did this
const apiAuth = () => {
  const apiAuth = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
    authorization: `Bearer ${token}`
    },
  });
  return apiAuth;
};

///Not sure if this is the way we want to do this
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
    return resp.data;
//we should see about this
    updateToken(resp.data.token);
  } catch(e) {
    console.error(e);
  };
};

const loginUser = async (user) => {
  try {
    const resp = await api.post(`/users/login`, user);
    return resp.data;
//same as above
    updateToken(resp.data.token);
  } catch(e) {
    console.error(e);
  };
};

//changed name of function to get all users
const getAllUsers = async () => {
  try {
    const resp = await api(`/users`);
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
const postAlbum = async (userId, newAlbum) => {
  try {
    const resp = await api.post(`users/user-id/${userId}/albums`, newAlbum);
    return resp.data;
  } catch(e) {
    console.error(e);
  };
};

//changed slug, path, moved
const editAlbum = async (userId, albumId, updatedAlbum) => {
  try {
    const resp = await api.put(`/user/user-id/${userId}/albums/album-id/${albumId}`, updatedAlbum);
    return resp.data;
  } catch(e) {
    console.error(e);
  };
};

//I moved this so all concerns are together changed slug changed destroy to delete
const deleteAlbum = async (userId, albumId) => {
  try {
    const resp = await api.delete(`users/user-id/${userId}/albums/album-id/${albumId}`, album);
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

//changed path, arguments
const postSong = async (userId, albumId, newSong) => {
  try {
    const resp = await api.post(`/users/user-id/${userId}/albums/album-id/${albumId}/songs`, newSong);
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
    return resp.data;
  } catch(e) {
    console.error(e);
  };
};

//changed names and order to match
export {
  postUser,
  loginUser,
  getAllUsers,
  getUserMusic,
  getUserAlbums,
  postAlbum,
  editAlbum,
  deleteAlbum,
  getAlbumSongs,
  postSong,
  editSong,
  deleteSong,
}
