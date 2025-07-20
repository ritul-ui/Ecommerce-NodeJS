console.log("hey this from server.js");

const fs = require("fs");
const http = require("http");

const express = require("express");

const app = express();
//middeware
app.use(express.json()); //parse  our json data
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //parse the form data

app.get("/", (req, res) => {
  // res.send("hello !!")
  res.sendFile(__dirname + "/index.html");
});

app.post("/add", (req, res) => {
  const { num1, num2 } = req.body;
  res.send(`the result of addition is ${num1 + num2}`);
});
// app.get("/add", (req, res) => {
//   const val = 4 + 5;
//   res.send(`the resukt of addition is ${val}`);
// });

// fs.writeFile("output.txt", "hello , this the output file", (err) => {
//   if (err) {
//     console.error("error writing file", err);
//   } else {
//     console.log("file written succcesfully");
//   }
// });

// fs.readFile("output.txt", "utf-8", (err, data) => {
//   if (err) console.error("error reading file", err);
//   else console.log("file content", data);
// });

// const server = http.createServer((req, res) => {
//   console.log("request recived", req.url);
//   const url = req.url;
//   if (url == "/") res.end("hello");
//   if (url == "/add") res.end("hello add");
//   if (url == "/subtract") res.end("hello subtract");
//   res.end("hello, this is the respnse from the server!");
// });

app.listen(3000, () => {
  console.log("server is listenning on port 3000");
});
