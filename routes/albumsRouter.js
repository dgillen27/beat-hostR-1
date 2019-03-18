const express = require('express');
const { User } = require('../models');

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res) => {
  try {
    const { userId } = res.locals;
    const user = await User.findByPk(userId);
    const albums = await user.getAlbums();
    res.json({ albums });
  } catch(e) {
    console.log(e);
    res.status(401).send(e.message);
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
    res.status(401).send(e.message);
  };
});

module.exports = albumsRouter;
