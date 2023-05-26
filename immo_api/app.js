const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const typepandRouter = require('./routes/typepand');
const gebruikerRouter = require('./routes/gebruiker');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log(`Req to: ${req.url} w/ip: ${req.ip}`);
    next();
});

app.use('/', indexRouter);
app.use('/typepanden', typepandRouter);
app.use('/gebruikers', gebruikerRouter);

app.all("*", (req, res) => {
    res.status(404).send("Page not found");
});

module.exports = app;
