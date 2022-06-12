const mongoose = require("mongoose");
const User = require("./user");

const PostSchema = mongoose.Schema({
  title: String,
  body: String,
  userId: {
      type: mongoose.Types.ObjectId,
      ref: User,
      default: "62a6382b66e9937d91e3abf2",
  },
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const PostMessage = mongoose.model("PostMessage", PostSchema);

module.exports = PostMessage;
