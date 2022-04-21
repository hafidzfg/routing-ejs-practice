const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");
const router = express.Router();
const fs = require("fs");
let users = require("../database/users.json");

// router.use(cors());

//configure body parser middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/api/v1/postRegister", (req, res) => {
  const register = req.body;
  console.log(register);
  //still error not working yet
  let data = JSON.stringify(register);
  console.log(data);
  fs.writeFile(users, data, (err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
  res.send("User registration successful!");
});

router.post("/api/v1/login", (req, res) => {
  const login = req.body;
  console.log(login);
  for (let i = 0; i < users.length; i++) {
    const element = users[i];
    if (login.email === element.email && login.password === element.password) {
      res.status(200);
      res.redirect("/game");
    } else if (
      login.email != element.email ||
      login.password != element.password
    ) {
      res.status(401);
      res.send("Wrong email or password!");
    } else if (err)
      res.send("Something is wrong! Please contact the developer");
  }
});
module.exports = router;
