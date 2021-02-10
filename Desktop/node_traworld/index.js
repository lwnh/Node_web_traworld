const express = require("express");
const bodyParser = require("body-parser");
const expressSession = require('express-session');
const database = require('./server/database/database');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressSession({
    secret: 'ambc@!vsmkv#!&*!#EDNAnsv#!$()_*#@',
    resave: false,
    saveUninitialized: true
}))

app.use('/api', require('./server/routes/routers'));

app.all('*', function(req, res){
    res.status(404).send('<h1>요청한 페이지를 찾을 수 없습니다.</h1>');
});

app.listen(port, () => {
    console.log(`Server Running at ${port}`);
    database();
});

module.exports = database;