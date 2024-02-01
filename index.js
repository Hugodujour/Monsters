const express = require("express");
const favicon = require("serve-favicon");
const morgan = require("morgan");
const helper = require("./helpers");
const path = require("path");

let monsters = require("./monsters");
const app = express();
const port = 3000;

// Middleware
app
  .use(favicon(path.join(__dirname, "favicon.ico")))
  .use(morgan("dev"))
  .use(express.json());

// Hello world
app.get("/", (req, res) => {
  res.send(`<a href='/monsters' >Psst, monsters here ! 👀</a>`);
});

// GET monsters
app.get("/monsters", (req, res) => {
  res.json(monsters);
});

// Localhost
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
