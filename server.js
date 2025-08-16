const express = require("express");
// require("crypto").randomBytes(64).toString("hex")
const mongoose = require("mongoose");

const app = express();

// Get the DB connection URI from the config file

const { mongoURI } = require("./config/key");
const authenticateToken = require("./config/authHandler");

console.log("MongoDB URI:", mongoURI);

// Connect to MongoDB

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

//middleware

app.use(express.json()); // parse our json data

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true })); //parse the form data

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use("/products", require("./routes/product"));

app.use("/users", require("./routes/user"));
app.use("/orders", authenticateToken, require("./routes/orders"));

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
