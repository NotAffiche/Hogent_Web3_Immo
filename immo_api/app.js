const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log(`Er is een request gebeurd naar ${req.url} met ip: ${req.ip}`);
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.all("*", (req, res) => {
    res.status(404).send("Page not found");
});

module.exports = app;
