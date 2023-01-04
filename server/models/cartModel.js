const mongoose = require("mongoose");
const orderDetailSchema = require("./orderModel").OrderDetails.schema;

const cartSchema = mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  cartDetails: [
    {
      type: orderDetailSchema,
    },
  ],
});

const Cart = mongoose.model("carts", cartSchema);
module.exports = { Cart };