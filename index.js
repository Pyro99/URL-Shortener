const express = require('express');
const app = express();
const path = require('path');
const URLRouter = require('./routes/url.js');
const staticRouter = require('./routes/staticRouter.js');
const PORT = 8000;

const getDBConnection = require('./connection.js');

getDBConnection('mongodb://127.0.0.1:27017/short-url')
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/url', URLRouter);
app.use('/',staticRouter)
app.listen(PORT, () => console.log(`Server started on Port : ${PORT}`));
