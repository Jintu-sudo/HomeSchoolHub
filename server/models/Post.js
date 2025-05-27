const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const PostSchema = new mongoose.Schema({
  user: String,
  title: String,
  content: String,
  file: {
    name: String,
    url: String
  },
  comments: [CommentSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", PostSchema);
