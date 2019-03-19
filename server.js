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

app.post('/create-file', (request, response) => {
  console.log("called");
  try{const form = new multiparty.Form();
    form.parse(request, async (error, fields, files) => {
      if (error) throw new Error(error);
      try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = fileType(buffer);
        const timestamp = Date.now().toString();
        const fileName = `bucketFolder/${timestamp}-lg`;
        const data = await uploadFile(buffer, fileName, type);
        return response.status(200).send(data);
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
