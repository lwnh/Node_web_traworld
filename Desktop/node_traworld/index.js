const express = require("express");
const bodyParser = require("body-parser");
const database = require('./server/database/database');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', require('./server/routes/routers'));

app.listen(port, () => {
    console.log(`Server Running at ${port}`);
    database();
});

module.exports = database;