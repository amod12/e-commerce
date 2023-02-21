const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    image:{type:String},
    catagoryName: { type: String },
    price: { type: Number },
    catagoryDescription:{type: String},
    catagoryRole:{type: String},
  },
  { collection: "items" }
);
module.exports = mongoose.model("Items", itemSchema);