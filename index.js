const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = 3000;
const app = express();
let blogContent = require("./blogs.json");
const data = JSON.parse(fs.readFileSync("blogs.json", "utf-8"));
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
  // const blogUsr = blogContent.find((name) => name.author === author);
  res.render("details.ejs", { name, id, blogContent, blog });
});
//server

app.get("/create", (req, res) => {
  res.render("createBlog.ejs", {});
});

app.post("/create", (req, res) => {
  data.author.push({
    author: "mfhkjsdfh",
  });
  let { username } = req.body;
  blogContent.push(username);
  res.send("blog added successfully");
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
