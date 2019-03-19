const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());
app.use(logger('combined'));
app.use(cors());

app.get('/', (req, res) => {
  res.send(`hello word`)
})

app.listen(PORT, () => {
  console.log(`Ready and waiting on port: ${PORT}`)
});
