const sqlite3 = require('sqlite3');
const express = require('express');
const cors = require('cors');
const TYPE = require('./type.js');
const initial = require('./initial.js');
const get = require('./get.js');
const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use('/assets', express.static('assets'));

const PORT = 8000;
const db = new sqlite3.Database('database.db', (err) => {
  if (!err) {
    initial.run(db, TYPE.about_me);
    initial.run(db, TYPE.resume);
    initial.run(db, TYPE.applications);
    initial.run(db, TYPE.notification);
  }
});

app.listen(PORT, () => {
  console.log(`Listening... ${PORT}`);
});

get.setup(app, db);
