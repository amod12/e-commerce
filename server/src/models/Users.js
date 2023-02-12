const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: { type: String },
    address: { type: String},
    email: { type: String },
    password: { type: String },
    avatarName: {type: String},
    phone:{ type: Number},
    role: { type: String, default:'user' },
  },
  { collection: "users" }
);
module.exports = mongoose.model("Users", usersSchema);
