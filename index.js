const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const cors = require("cors");
const morgan = require("morgan");
require("./config/database").connect();
const auth = require("./middleware/auth");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
const port = process.env.PORT || 8000;

// localhost:3000/v1/member
// app.use("/v1", require("./router/member_router"));
// localhost:3000/v1/login
// app.use("/v1", require("./router/login_router"));
// information
app.get("/", (req, res) => {
  console.log("data");
  res.status(200).json({
    message: "Api Working",
  });
});

app.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    // const oldUser = await User.findOne({ email });

    // if (oldUser) {
    //   return res.status(409).send("User Already Exist. Please Login");
    // }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    // const user = await User.create({
    //   first_name,
    //   last_name,
    //   email: email.toLowerCase(), // sanitize: convert email to lowercase
    //   password: encryptedPassword,
    // });
    const user = { name: "Shahrukh" };
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

app.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    // const user = await User.findOne({ email });
    const user = { name: "Shahrukh", email, password };
    // if (user && (await bcrypt.compare(password, "124"))) {

    if (user && (password = "123")) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

app.get("/user", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});
app.listen(port, () => {
  console.log("server Activited");
});
