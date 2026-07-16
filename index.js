const express = require("express");
const path = require("path");
const PORT = 3000;
const app = express();
let blogContent = require("./blogs.json");
let name;
for (let blogs of blogContent) {
  name = blogs;
}

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/images", express.static(path.join(__dirname, "public", "images")));
//routes

app.get("/", (req, res) => {
  res.render("landing", { name });
});

app.post("/", (req, res) => {
  console.log(req.body);
});

app.get("/blogs", (req, res) => {
  res.render("blogs.ejs", { blogContent, name });
});

app.get("/blogs/:id", (req, res) => {
  const id = Number(req.params.id);
  const blog = blogContent.find((name) => name.id === id);
  res.render("details.ejs", { name, id, blogContent, blog });
});
//server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
