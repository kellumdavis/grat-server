const mongoose = require("mongoose");
const User = require("./user");

const PostSchema = mongoose.Schema({
  title: String,
  body: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: User,
  },
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", PostSchema);

module.exports = PostMessage;
