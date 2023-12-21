const express = require("express");
const { validation, getTransaksi, getTransaksiIndex, createTransaksi, updateTransaksi } = require("../controllers/transaksi");
const app = express();

app.get("/transaksis", getTransaksi);
app.get("/transaksis/:id", getTransaksiIndex);
app.post("/transaksis", [validation, createTransaksi]);
app.put("/transaksis/:id", [validation, updateTransaksi]);


module.exports = app;



