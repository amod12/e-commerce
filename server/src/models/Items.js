const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    image:{type:String},
    catagoryName: { type: String },
    minimumDeliveryPrice: { type: Number },
  },
  { collection: "items" }
);
module.exports = mongoose.model("Items", itemSchema);