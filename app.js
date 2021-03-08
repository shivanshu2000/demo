const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use(function (req, res, next) {
  res.locals.error = req.flash('error');
  next();
});

const routes = require('./routes/index');

app.use(routes);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => {
    console.log(err);
  });
const port = process.env.PORT || 3000;
app.listen(port);
