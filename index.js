import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [
  {
    id: 2,
    title: "de Finibus Bonorum et Malorum, written by Cicero in 45 BC",
    date: "Wednesday, May 28, 2025",
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mi lectus, vulputate ut ullamcorper eu, blandit ac lectus. Aenean sagittis felis lacus, et semper purus mollis eu. Sed nec finibus purus. Ut sed purus sodales, fringilla est eget, euismod mauris. Etiam vel arcu eu orci efficitur dictum. Phasellus enim leo, sagittis vel interdum a, sodales in lorem. Aenean eu metus sed ex pharetra sagittis. Donec bibendum elit sit amet arcu ornare, eleifend varius nisl tempor. Pellentesque nisl urna, condimentum ac mattis at, fringilla id felis.",
    author: "Jeehay Park",
  },
  {
    id: 1,
    title: "The standard Lorem Ipsum passage, used since the 1500s",
    date: "Wednesday, May 28, 2025",
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    author: "Jeehay Park",
  },
];

app.get("/", (req, res) => {
  res.render("index.ejs", { headerText: "write", data: posts });
});

app.get("/write", (req, res) => {
  res.render("write.ejs", {
    action: "/publish",
    isNewPost: true,
  });
});

app.post("/publish", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    story: req.body.story,
    date: new Date().toISOString(),
    author: req.body.author,
  };

  posts.unshift(newPost);

  setTimeout(() => {
    res.redirect("/");
  }, 500);
});

app.get("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = posts.findIndex((post) => post.id === id);
  const existingPost = posts[searchIndex];

  res.render("write.ejs", {
    data: existingPost,
    action: "/edit/" + req.params.id,
    isNewPost: false,
  });
});

app.post("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = posts.findIndex((post) => post.id === id);
  const updatedPost = {
    id: id,
    title: req.body.title,
    story: req.body.story,
    date: new Date().toISOString(),
    author: req.body.author,
  };

  posts[searchIndex] = updatedPost;

  setTimeout(() => {
    res.redirect("/");
  }, 5);
});

app.get("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = posts.findIndex((post) => post.id === id);

  if (searchIndex < 0)
    return res.status(500).json({ message: "Error deleting post" });

  posts.splice(searchIndex, 1);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
