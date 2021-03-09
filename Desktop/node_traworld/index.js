const express = require("express");
const bodyParser = require("body-parser");
const expressSession = require('express-session');
const passport = require('passport');
const configPassport = require('./server/config/passport');
const database = require('./server/database/database');

const app = express();
const router = express.Router();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressSession({
    secret: 'ambc@!vsmkv#!&*!#EDNAnsv#!$()_*#@',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
configPassport(passport);

const indexRouter = require('./server/routes/routers')(router, passport);
app.use('/api', indexRouter);

app.all('*', function (req, res) {
    res.status(404).send('<h1>요청한 페이지를 찾을 수 없습니다.</h1>');
});

app.listen(port, () => {
    console.log(`Server Running at ${port}`);
    database();
});

module.exports = database;