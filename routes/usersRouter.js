const express = require('express');
const { User, Album, Song } = require('../models')
const { hashPassword, isAuthorized, genToken } = require('../auth');
const albumsRouter = require('./albumsRouter');

const usersRouter = express.Router();

const buildAuthResponse = (user) => {
  const token_data = {
    id: user.id,
    artist_name: user.artist_name,
    email: user.email,
  };

  const token = genToken(token_data);

  return {
    user: token_data,
    token,
  };
};

usersRouter.get('/', async (req, res) => {
  try {
    const users =  await User.findAll();
    res.json({ users });
  } catch(e) {
    console.log(e);
    res.stats(500).send(e.message);
  }
});

usersRouter.post('/', async (req, res) => {
  try {
    const { password, email, artist_name } = req.body;
    const password_digest =  await hashPassword(password);
    const newUser = await User.create({
      password_digest,
      email,
      artist_name,
    });

    const respData = buildAuthResponse(newUser);

    res.json({ ...respData });
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  };
});

usersRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email
      },
    });

    if(await isAuthorized(password, user.password_digest)) {
      const respData = buildAuthResponse(user);
      res.json({ ...respData })
    } else {
      res.status(401).send(`Invalid Credentials. BEGONE!`);
    }
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  }
})

usersRouter.get('/user-id/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json({ user });
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  };
});

usersRouter.put('/user-id/:id', async (req, res) => {
  try {
    const { password, email, artist_name } = req.body;
    const user = await User.findByPk(req.params.id);
    if(await isAuthorized(password, user.password_digest)) {
      const updatedUser = await user.update({ email, artist_name });
      const respData = buildAuthResponse(updatedUser);
      res.json({ ...respData });
    } else {
      res.status(401).send(`Invalid Credentials. BEGONE!`);
    }
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  }
})

usersRouter.delete('/user-id/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    const resp = await user.destroy();
    res.json({ message: resp });
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  };
});

usersRouter.get('/user-id/:id/music', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    const albums = await user.getAlbums();
    let songs = [];
    for (let i = 0; i < albums.length; i++) {
      const albumSongs = await albums[i].getSongs();
      songs = [...songs, ...albumSongs];
    };
    const music = albums.map( album => ({
      id: album.id,
      title: album.title,
      genre: album.genre,
      createdAt: album.createdAt,
      updatedAt: album.updatedAt,
      userId: album.userId,
      songs: songs.filter(song => song.albumId === album.id),
    }));
    res.json({ music });
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  }
})

usersRouter.use('/user-id/:id/albums', (req, res, next) => {
  res.locals.userId = req.params.id;
  next()
},  albumsRouter);

module.exports = usersRouter
