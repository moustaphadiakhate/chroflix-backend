/* eslint-disable camelcase */
// app.js file
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');
const api_routes = require('./routes');


const app = express();



const corsOptions = {
  origin: '*',
};

app.use(morgan('tiny'));
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Resquested-With, Content-Type, Accept, Athorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
    res.status(200).json({});
  }
  next();
});

app.use('/public', express.static('public'));

// simple route
app.get('/', (req, res) => {
  res.json({ status: 200, result: 'Chroflix api server.. nothing to see here' });
});

// api routes
app.use('/api', api_routes);

// gestion des erreurs unknown route
app.use((req, res, next) => {
  const error = new Error('not found');
  error.status = 404;
  next(error);
});

app.use((err, req, res) => {
  res.status(err.statut || 500);
  res.json({
    error: {
      message: 'oups ! ce lien n exsiste pas',
    },
  });
});

// set port, listen for requests
const { PORT } = config;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
