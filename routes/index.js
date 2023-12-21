const express = require("express");
const app = express();
const cors = require("cors");

const EO = require("./eventOrganizers")
const users = require("./users");
const events = require("./events");
const tikets = require("./tikets");
const transaksi = require("./transaksis")

const api = "/api/v1";

// http://localhost:50501/api/v1

app.use(cors());
app.use(api, users);
app.use(api, EO);
app.use(api, events);
app.use(api,tikets);
app.use(api, transaksi);

module.exports = app;
