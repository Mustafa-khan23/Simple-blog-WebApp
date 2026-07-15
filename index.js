const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/login", (req, res) => {
  console.log(req.body);

  res.send(`Welcome ${req.body.username}`);
});

app.listen(3000);
