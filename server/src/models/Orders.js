const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
  {
    orders:[{
      image:{type:String},
      catagoryName: { type: String },
      catagoryRole:{type: String},
      price: { type: Number },
      quantity: { type: Number },
    },],  
    orderStatus: { type: String, default:'Pending' },
    name:{type: String},
    userId:{type: String},
    phone:{type: Number},
    address:{type:String},
    email: { type: String },
    pickupDate:{type:String},
    pickupTime:{type:String},
    totalPrice: { type: Number },
    quantity: { type: Number },


  },
  { collection: "orders" }
);
module.exports = mongoose.model("Orders", ordersSchema);