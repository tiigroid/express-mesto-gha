const express = require('express');
const mongoose = require('mongoose');
const jsonParser = require('body-parser').json();
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const { sendServerError } = require('./utils/errors');

const { PORT = 3000 } = process.env;

const app = express();

app.use(jsonParser);

app.use((req, res, next) => {
  req.user = { _id: '63d406d6ceb3d03c4fdfe47e' };
  next();
});

app.use('/users', routerUsers);
app.use('/cards', routerCards);
app.use('/', (req, res) => sendServerError(res));

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);
