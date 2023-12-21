const express = require("express");
const { validation, getEvent, getEventIndex, createEvent, updateEvent } = require("../controllers/event");
const app = express();

app.get("/events", getEvent);
app.get("/events/:id", getEventIndex);
app.post("/events", [validation, createEvent]);
app.put("/events/:id", [validation, updateEvent]);


module.exports = app;



