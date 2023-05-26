const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const pandenRouter = require('./routes/panden');
const typepandRouter = require('./routes/typepand');
const gebruikerRouter = require('./routes/gebruiker');
const afbeeldingRouter = require('./routes/afbeelding');
const regioRouter = require('./routes/regio');
const pandregioRouter = require('./routes/pandregio');

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
app.use('/panden', pandenRouter);
app.use('/typepanden', typepandRouter);
app.use('/gebruikers', gebruikerRouter);
app.use('/afbeeldingen', afbeeldingRouter);
app.use('/regios', regioRouter);
app.use('/pandregios', pandregioRouter);

app.all("*", (req, res) => {
    res.status(404).send("Page not found");
});

module.exports = app;
