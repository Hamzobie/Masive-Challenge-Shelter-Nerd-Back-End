const express = require("express");
const { validation, getUser, createUser, getUserIndex, updateUser, login } = require("../controllers/user");
const app = express();

// define API
// http://localhost:50501/api/v1/Users
app.get("/users", getUser);
app.get("/users/:id", getUserIndex);
app.post("/users", [validation, createUser]);
app.post("/users/login", login)
app.put("/users/:id", [validation, updateUser]);


module.exports = app;
