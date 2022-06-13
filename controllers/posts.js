const mongoose = require("mongoose");
const db = require('../models')
const express = require('express')
const bcrypt = require("bcryptjs");
const router = express.Router()


router.get('/',async (req, res) => {
    try {
        const postMessages = await db.PostMessage.find({});
        
        console.log(postMessages);

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
})


router.post('/', async (req, res) => {
    const post = req.body;
    
    const newPost = new PostMessage(post);
    
    try {
        await newPost.save();
        console.log(newPost)
        res.status(201).json(newPost);
        
    } catch (error) {
        res.status(409).json(error)
    }
})



function create(data){
    // console.log(data)
    db.User.create(data)
    .then((newPost)=>{
        // console.log(err)
        console.log(newPost)   
    }).catch(err=> {
        console.log(err)
    }).finally(()=> {
        process.exit()
    })
  }
  async function seedingData(){
    const names =  ['Kellum', 'Jacob', 'Austin', 'Justin', 'Howey', 'Marcos', 'Gigi'];
    const hashedPassword = await bcrypt.hash('12345678', 10);
    for(let i = 0; i < 14; ++i){
        const id = Math.floor(Math.random() * names.length)
        const data = {
            name :  names[id],
            password : hashedPassword,
            email: names[id] + Math.floor(Math.random() * 100000000).toString() + '@gmail.com',
        }
        try {
            await db.User.create(data)
            
        } catch (error) {
            console.log(error);
        }
    }
  }
  seedingData();
module.exports = router;