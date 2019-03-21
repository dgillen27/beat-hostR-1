require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const { Album, User } = require('./models');
const { restrict } = require('./auth');

const PORT = process.env.PORT || 4000;

const usersRouter = require('./routes/usersRouter');
const albumsRouter = require('./routes/albumsRouter');
const songsRouter = require('./routes/songsRouter');

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());

app.use('/users', usersRouter);
// app.use('/albums', albumsRouter);
// app.use('/songs', songsRouter);

app.get('/', (req, res) => {
  try {
    res.json({ mesg: `This is the main page`})
  } catch(e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

// Found from medium article
// https://medium.com/@fabianopb/upload-files-with-node-and-react-to-aws-s3-in-3-steps-fdaa8581f2bd

const addSongToDb = async (albumId, song) => {
  try {
    const album = await Album.findByPk(albumId);

    const resp = await album.createSong(song);
    const newSong = resp.dataValues;

    return newSong
  } catch(e) {
    return e;
  }
}

const addAlbumToDb = async (userId, album) => {
  try {
    const user = await User.findByPk(userId);

    const resp = await user.createAlbum(album);
    const newAlbum = resp.dataValues

    return newAlbum;
  } catch(e) {
    return e;
  }
}

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

AWS.config.setPromisesDependency(bluebird);

const s3 = new AWS.S3();

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

app.post('/create-album', restrict, (request, response) => {
  try{
    const form = new multiparty.Form();
    form.parse(request, async (error, fields, files) => {
      if (error) throw new Error(error);
      try {
        const { title, userId, genre } = fields;
        console.log( title[0], userId[0], genre[0]);
        if (files.file) {
          const path = files.file[0].path;
          const buffer = fs.readFileSync(path);
          const type = fileType(buffer);
          const timestamp = Date.now().toString();
          const fileName = `bucketFolder/${timestamp}-lg`;
          const data = await uploadFile(buffer, fileName, type);
          const image_url = data.Location;
          console.log(data.Location);
          const album = await addAlbumToDb(userId[0], { title: title[0], genre: genre[0], image_url });
          return response.status(200).json({ album });
        } else {
          const album = await addAlbumToDb(userId[0], { title: title[0], genre: genre[0] })
          return response.status(200).json({ album });
        }
      } catch (error) {
        console.log(error);
        return response.status(400).send(error);
      }
    });}
    catch(e){
      console.log(e);
      return response.status(500).send(e)
    }
});

app.post('/create-song', restrict, (request, response) => {
  try{
    const form = new multiparty.Form();
    form.parse(request, async (error, fields, files) => {
      if (error) throw new Error(error);
      try {
        const { title, albumId } = fields;
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = fileType(buffer);
        const timestamp = Date.now().toString();
        const fileName = `bucketFolder/${timestamp}-lg`;
        const data = await uploadFile(buffer, fileName, type);
        const file_url = data.Location;
        console.log(data.Location);
        const song = await addSongToDb(albumId[0], { title: title[0], file_url });
        return response.status(200).json({ song });
      } catch (error) {
        return response.status(400).send(error);
      }
    });}
    catch(e){
      console.log(e);
      return response.status(500).send(e)
    }
});

app.listen(PORT, () => {
  console.log(`Ready and waiting on port: ${PORT}`)
});
