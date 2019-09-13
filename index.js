const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/database-config');
const notesRoutes = require('./routes/routes');

const app = express();

// parse requests application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests application/json
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/notes', notesRoutes);
// Mongoose - MongoDB Connection
mongoose.Promise = global.Promise;
mongoose.connect(db.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Unable to connect to the database. Exiting now...', err);
  process.exit();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));
