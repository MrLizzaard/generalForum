const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, require: [true, "Title is required!"] },
  body: { type: String, require: [true, "Body is required!"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;
