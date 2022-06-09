const mongoose = require("mongoose");
const db = require('../models')
const express = require('express')
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
module.exports = router;