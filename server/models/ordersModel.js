const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    tableNumber: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    cartItems: { type: Array, required: true }
}, { timestamps: true });

const orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel;