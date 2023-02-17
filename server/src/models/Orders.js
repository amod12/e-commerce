const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
  {
    image:{type:String},
    catagoryName: { type: String },
    minimumDeliveryPrice: { type: Number },
    orderStatus: { type: String, default:'Pending' },
    name:{type: String},
    userId:{type: String},
    phone:{type: Number},
    quantity: { type: Number },
    address:{type:String},
    email: { type: String },
    pickupDate:{type:String},
    pickupTime:{type:String},
  },
  { collection: "orders" }
);
module.exports = mongoose.model("Orders", ordersSchema);