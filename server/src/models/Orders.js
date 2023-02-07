const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
  {
    image:{type:String},
    catagoryName: { type: String },
    minimumDeliveryPrice: { type: Number },
    orderStatus: { type: String, default:'Pending' },
    
  },
  { collection: "orders" }
);
module.exports = mongoose.model("Orders", ordersSchema);