/* eslint-disable camelcase */
// app.js file
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');
const api_routes = require('./routes');

// database
const db = require('./models');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(morgan('tiny'));
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// const Role = db.role;
// db.sequelize.sync().then(() => {
//   initial(); // Just use it in development, at the first time execution!. Delete it in production
// });

// simple route
app.get('/health', (req, res) => {
  res.json({ status: 200, result: 'Chroflix api server.. nothing to see here' });
});

// api routes
app.use('/api', api_routes);

// set port, listen for requests
const { PORT } = config;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
