require("dotenv").config();


const controllers = require('./controllers')
const models = require('./models')

const { PORT = 4000, MONGODB_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const User = require("./models/user");
const jwt = require('jsonwebtoken')

mongoose.connect(MONGODB_URL);

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

app.post("/api/login", async (req, res) => {
    const user = await User.findOne({
      email:  req.body.email,
      password: req.body.password,
    })



    if (user) {

      const token = jwt.sign(
        {
            name: user.name,
            email: user.email,
      }, 
      'secure12345'
      )

      return res.json({ status: 'ok', user: token })
    } else {
      return res.json({ status: 'error', user: false })
    }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));