///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();


const controllers = require('./controllers')
const models = require('./models')

// pull PORT from .env, give default value of 3000
// pull MONGODB_URL from .env
const { PORT = 4000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");
const UserModel = require("./models/user");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL);
// Connection Events
mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

  app.use(cors())
  app.use(express.json())
///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.use('/posts', controllers.PostMessageController)

app.post("/api/register", async (req, res) => {
  console.log(req.body)
  try {
    const user = await UserModel.create({
      name: req.body.name,
      email:  req.body.email,
      password: req.body.password,
    })
    res.json({ status: 'ok'})
  
  } catch (err){

    res.json({ status: 'error', error: 'Duplicate email'})
  }

});

app.post("/api/login", async (req, res) => {
  console.log(req.body)
  try {
    await User.create({
      name: req.body.name,
      email:  req.body.email,
      password: req.body.password,
    })
    res.json({ status: 'ok'})
  
  } catch (err){

    res.json({ status: 'error', error: 'Duplicate email'})
  }

});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));