const express = require('express');
const mongoose = require('mongoose');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const { sendPathNotFound } = require('./utils/errors');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = { _id: '63d406d6ceb3d03c4fdfe47e' };
  next();
});

app.use('/users', routerUsers);
app.use('/cards', routerCards);
app.use('/', (req, res) => sendPathNotFound(res));

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);
