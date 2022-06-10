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
const bcrypt = require('bcryptjs')

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
    const newPassword = await bcrypt.hash(req.body.password, 10)
     await User.create({
      name: req.body.name,
      email:  req.body.email,
      password: newPassword,
    })
    res.json({ status: 'ok'})
  
  } catch (err){
    res.json({ status: 'error', error: 'Duplicate email'})
  }

});

app.post("/api/login", async (req, res) => {
    const user = await User.findOne({
      email:  req.body.email,
    })

    if(!user) { return { status: 'error', error: 'Invalid login'}}

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)



    if (isPasswordValid) {

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

app.get("/api/user", async (req, res) => {

  const token = req.headers['x-access-token']

  try {
  const decoded = jwt.verify(token, 'secure12345' )
  const email = decoded.email
  const user = await User.findOne({ email: email })

  return res.json({ status: 'ok', quote: user.quote })
  } catch(error) {
    console.log(error)
    res.json({ status: 'error', error: 'invalid token'})
  }
  });

  app.post("/api/user", async (req, res) => {

    const token = req.headers['x-access-token']
  
    try {
    const decoded = jwt.verify(token, 'secure12345' )
    const email = decoded.email
    await User.updateOne(
      { email: email },
      { $set: { quote: req.body.quote }}
      )
  
    return res.json({ status: 'ok'})
    } catch(error) {
      console.log(error)
      res.json({ status: 'error', error: 'invalid token'})
    }
    });
///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));