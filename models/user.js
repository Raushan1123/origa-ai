const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "superadmin"],
    },
    userId : { type : Number , required : true , unique : true },
    noOfOrders : { type : Number , default : 0 }

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
