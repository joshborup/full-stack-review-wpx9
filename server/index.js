const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const dotenv = require('dotenv');
dotenv.config();
const authController = require('./controllers/authController');
const quotesController = require('./controllers/quotesController');

massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db);
}).catch(error => {
  console.log('error connecting to db', error);
});

const app = express();
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2
  }
}));

app.get('/auth/callback', authController.login);
app.get('/auth/user-data', authController.getUser);
app.post('/auth/logout', authController.logout);
app.get('/api/quotes', quotesController.getQuotes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
