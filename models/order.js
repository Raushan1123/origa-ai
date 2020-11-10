const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
   orderId : { type : Number , required : true , unique : true},
   userId : { type : Number , required : true },
   subtotal : { type : Number , required : true  },
   orderdDate : { type : Date , default : Date.now() }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
