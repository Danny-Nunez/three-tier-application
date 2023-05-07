const express = require("express");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const cors = require("cors");
const _ = require("lodash");
const port = 8000;

const app = express();
const adapter = new FileSync("db.json");
const db = low(adapter);

// Initialize the data store
db.defaults({ users: [] }).write();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("public"));

// Return all users
app.get("/data", function (req, res) {
  res.send(db.get("users").value());
});

app.post("/test", function (req, res) {
  const { name, email, avatar } = req.body;

  // Create a new user object
  const newUser = { name, email, avatar };

  // Add the new user to the database
  db.get("users")
    .push(newUser)
    .write();

  res.send("User added successfully");
});



// Start server
app.listen(port, function () {
  console.log(`Running on port ${port}...`);
});


