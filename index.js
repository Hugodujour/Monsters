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

// Hello world + Link to monsters
app.get("/", (req, res) => {
  res.send(`<a href='/monsters' >Psst, monsters here ! 👀</a>`);
});

// GET /monsters - Tous les monstres
app.get("/monsters", (req, res) => {
  const message = `Il y a ${monsters.length} monstres ici !`;
  res.json(helper.success(message, monsters));
});

// GET /monsters/:id - Monstre spécifique
app.get("/monsters/:id", (req, res) => {
  id = parseInt(req.params.id);
  const monsterFiltered = monsters.find((monster) => monster.id === id);
  const message = `Le monstre ${monsterFiltered.name} a été trouvé !`;
  res.json(helper.success(message, monsterFiltered));
});

// POST /monsters - Créer un monstre
app.post("/monsters", (req, res) => {
  id = helper.monsterId(monsters);
  const monsterCreated = {
    ...req.body,
    ...{ id: id, created_at: new Date() },
  };
  monsters.push(monsterCreated);
  const message = `Le monstre ${monsterCreated.name} a été ajouté avec succès !`;
  res.json(helper.success(message, monsterCreated));
});

// PUT /monsters/:id - Modifier un monstre
app.put("/monsters/:id", (req, res) => {
  id = parseInt(req.params.id);
  const monsterName = monsters.find((monster) => monster.id === id);
  const monsterModified = {
    ...req.body,
    ...{ id: id, modified_at: new Date() },
  };
  const message = `Le monstre ${monsterName.name} a bien été modifié !`;
  monsters = monsters.map((monster) =>
    monster.id === id ? monsterModified : monster
  );
  res.json(helper.success(message, monsterModified));
});

// DELETE /monsters/:id - Supprimer un monstre
app.delete("/monsters/:id", (req, res) => {
  id = parseInt(req.params.id);
  const monsterDeleted = monsters.find((monster) => monster.id === id);
  monsters = monsters.filter((monster) => monster.id !== id);
  const message = `Le monstre ${monsterDeleted?.name} a bien été supprimé !`;
  res.json(helper.success(message, monsterDeleted));
});

// DELETE /monsters - DOOMSDAY, supprimer tous les monstres !
app.delete("/monsters", (req, res) => {
  const monsterLength = monsters.length;
  const message = `It's DOOMSDAY !! ${monsterLength} monstres ont été détruits !`;
  monsters = [];
  res.json(helper.success(message, monsters));
});

// Localhost
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
