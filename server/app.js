require("./database").connect();
const express = require("express");
const cors = require('cors');

const app = express();

app.use(express.json());

const foodRoute = require("./routes/foodRoute");
app.use(cors());

app.use("/food", foodRoute);

module.exports = app;