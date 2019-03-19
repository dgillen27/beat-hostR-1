const express = require('express');
const { User, Album } = require('../models');
const songsRouter = require('./songsRouter');

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res) => {
  try {
    const { userId } = res.locals;
    const user = await User.findByPk(userId);
    const albums = await user.getAlbums();
    res.json({ albums });
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  };
});

albumsRouter.post('/', async (req, res) => {
  try {
    const { title, genre } = req.body;
    const { userId } = res.locals;

    const user = await User.findByPk(userId);
    const newAlbum = await user.createAlbum({ title, genre });

    const album = newAlbum.dataValues
    res.json({ album });
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  };
});

albumsRouter.get('/album-id/:id', async (req, res) => {
  try {
    const albumId = req.params.id;
    const album = await Album.findByPk(albumId);
    res.json({ album })
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

albumsRouter.put('/album-id/:id', async (req, res) => {
  try {
    const { title, genre } = req.body;
    const albumId = req.params.id;

    const album = await Album.findByPk(albumId);
    const updatedAlbum = await album.update({ title, genre });

    res.json({ album: updatedAlbum });
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  }
})

albumsRouter.delete('/album-id/:id', async (req, res) => {
  try {
    const albumId = req.params.id;
    const album = await Album.findByPk(albumId);
    const resp = await album.destroy();
    res.json({ message: resp });
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  };
});

albumsRouter.use('/album-id/:id/songs', (req, res, next) => {
  res.locals.albumId = req.params.id;
  next()
}, songsRouter);

module.exports = albumsRouter;
