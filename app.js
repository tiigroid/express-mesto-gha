const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const handleErrors = require('./middlewares/handle-errors');
const { validateSignIn, validateSignUp } = require('./middlewares/handle-validation');
const { notFoundError } = require('./utils/errors');

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.post('/signin', validateSignIn(), login);
app.post('/signup', validateSignUp(), createUser);

app.use(auth);

app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.use('/', (req, res, next) => next(notFoundError('Путь не найден')));

app.use(errors());
app.use(handleErrors);

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);
