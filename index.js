import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const postData = [
  {
    postTitle: "The standard Lorem Ipsum passage, used since the 1500s",
    postDate: "Wednesday, May 28, 2025",
    postStory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },

  {
    postTitle: "de Finibus Bonorum et Malorum, written by Cicero in 45 BC",
    postDate: "Wednesday, May 28, 2025",
    postStory:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mi lectus, vulputate ut ullamcorper eu, blandit ac lectus. Aenean sagittis felis lacus, et semper purus mollis eu. Sed nec finibus purus. Ut sed purus sodales, fringilla est eget, euismod mauris. Etiam vel arcu eu orci efficitur dictum. Phasellus enim leo, sagittis vel interdum a, sodales in lorem. Aenean eu metus sed ex pharetra sagittis. Donec bibendum elit sit amet arcu ornare, eleifend varius nisl tempor. Pellentesque nisl urna, condimentum ac mattis at, fringilla id felis.",
  },
];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

app.get("/", (req, res) => {
  res.render("index.ejs", { headerText: "write", postData: postData });
});

app.get("/write", (req, res) => {
  res.render("write.ejs", { headerText: "publish" });
});

app.post("/publish", (req, res) => {
  const today = new Date();
  const options1 = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateTimeFormat3 = new Intl.DateTimeFormat("en-US", options1);

  postData.unshift({
    postTitle: req.body["title"],
    postStory: req.body["story"],
    postDate: dateTimeFormat3.format(today),
  });

  setTimeout(() => {
    res.redirect("/");
  }, 500);
});
