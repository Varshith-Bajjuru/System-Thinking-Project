import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index1.html");
});

app.get("/blog", (req, res) => {
  res.status(200).sendFile(path.join(__dirname + "/public/blog.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
