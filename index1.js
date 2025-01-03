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
  res.sendFile(__dirname + "/public/main.html");
});

app.get("/calculation", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/caluclation.html"));
});

app.get("/home",(req,res)=>{
  res.sendFile(__dirname + "/public/main.html")
})


app.get("/Courses",(req,res)=>{
  res.sendFile(__dirname + "/public/Courses.html")
})

app.get("/about",(req,res)=>{
  res.sendFile(__dirname+"/public/about.html")
})

app.get('/images',(req,res)=>{
  res.sendFile(__dirname+"/public/FAQs.html")
})

app.get('/thesis',(req,res)=>{
  res.sendFile(__dirname+"/public/Thsis.html")
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
