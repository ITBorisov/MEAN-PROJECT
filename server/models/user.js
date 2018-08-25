const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String},
  isAdmin: { type: Boolean, default: false},
  messages: [{
    message: { type: String},
    author: { type: String},
    createdAt: {type: Date, default: Date.now()}
  }
]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
