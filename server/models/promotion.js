const mongoose = require("mongoose");

const promotionSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: {type: String, require: true},
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: {type: Date, default: Date.now() },
  likes: {type: Number, default: 0},
  likedBy: {type: Array},
  dislike: {type: Number, default: 0},
  dislikedBy: {type: Array},
  comments: [{
      comment: { type: String},
      commentator: { type: String},
      createdAt: {type: Date, default: Date.now()}
    }
  ]

});

module.exports = mongoose.model("Promotion", promotionSchema);
