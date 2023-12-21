const express = require("express");
const { validation, getTiket, getTiketIndex, createTiket, updateTiket } = require("../controllers/tiket");
const app = express();

app.get("/tikets", getTiket);
app.get("/tikets/:id", getTiketIndex);
app.post("/tikets", [validation, createTiket]);
app.put("/tikets/:id", [validation, updateTiket]);


module.exports = app;



