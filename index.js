const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const { restrictToLoggedInUserOnly, checkAuth } = require('./middlewares/auth');
const PORT = 8000;

const URLRouter = require('./routes/url.js');
const staticRouter = require('./routes/staticRouter.js');
const userRouter = require('./routes/user.js');

const getDBConnection = require('./connection.js');
const req = require('express/lib/request.js');

getDBConnection('mongodb://127.0.0.1:27017/short-url')
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/url', restrictToLoggedInUserOnly, URLRouter);
app.use('/', checkAuth, staticRouter);
app.use('/user', userRouter);
app.listen(PORT, () => console.log(`Server started on Port : ${PORT}`));
