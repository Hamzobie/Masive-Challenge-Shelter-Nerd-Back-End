const express = require("express");
const bodyParser = require("body-parser");
const { createServer } = require("http");
const routes = require("./routes");

const app = express();
const PORT = 3000;
const server = createServer(app);

app.use(bodyParser.json());

app.use(routes); // our APi

app.use("/config", (_, res) => {
  return res.send("Server already running!");
});

// http://localhost:50501
server.listen(PORT, () => console.log(`server are running in http://localhost:${PORT}`));
