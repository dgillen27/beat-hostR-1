const express = require('express');
const { Album, Song } = require('../models');

const songsRouter = express.Router();

songsRouter.get('/', async (req, res) => {
  try {
    const { albumId } = res.locals;
    const album = await Album.findByPk(albumId);
    const songs = await album.getSongs();
    res.json({ songs });
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  };
});

songsRouter.post('/', async (req, res) => {
  try {
    const { title, file_url } = req.body;
    const { albumId } = res.locals;

    const album = await Album.findByPk(albumId);
    const newSong = await album.createSong({ title, file_url });

    const song = newSong.dataValues;
    res.json({ song });
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  };
});

songsRouter.get('/song-id/:id', async (req, res) => {
  try {
    const songId = req.params.id;
    const song = await Song.findByPk(songId);
    res.json({ song });
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  };
});

songsRouter.put('/song-id/:id', async (req, res) => {
  try {
    const { title, file_url } = req.body;
    const songId = req.params.id;

    const song = await Song.findByPk(songId);
    const updatedSong = await song.update({ title, file_url });

    res.json({ song: updatedSong });

  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  }
})

songsRouter.delete('/song-id/:id', async (req, res) => {
  try {
    const songId = req.params.id;
    const song = await Song.findByPk(songId);
    const resp = await song.destroy();
    res.json({ message: resp });
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  };
});

module.exports = songsRouter
