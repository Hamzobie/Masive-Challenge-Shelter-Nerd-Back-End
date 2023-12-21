const express = require("express");
const { validation, getEO, getEOIndex, createEO, updateEO, login } = require("../controllers/eventOrganizer");
const app = express();

app.get("/event-organizers", getEO);
app.get("/event-organizers/:id", getEOIndex);
app.post("/event-organizers", [validation, createEO]);
app.post("/event-organizers/login",login);
app.put("/event-organizers/:id", [validation, updateEO]);


module.exports = app;



