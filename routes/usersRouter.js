const express = require('express');
const { User } = require('../models')
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

usersRouter.get('/', async (req, res) => {
  try {
    const users =  await User.findAll();
    res.json({ users });
  } catch(e) {
    console.log(e);
    res.stats(401).send(e.message);
  }
});

usersRouter.get('/id/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json({ user });
  } catch(e) {
    console.log(e);
    res.status(401).send(e.message);
  }
})

usersRouter.use('/id/:id/albums', (req, res, next) => {
  res.locals.userId = req.params.id;
  next()
},  albumsRouter);

module.exports = usersRouter
