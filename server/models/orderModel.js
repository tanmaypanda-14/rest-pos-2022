const mongoose = require("mongoose");

const orderDetailSchema = mongoose.Schema({
    _item:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'items',
        required: true
    },
    price:{
        type: Number,

    },
    quantity:{
        type: Number,
        required: true
    },
    amount:{
        type: Number
    },
    
},{versionKey: false, _id: false});

const orderSchema = mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    orderDetails:[
        {
            type: orderDetailSchema
        }
    ],
    orderDate:{
        type: Date,
        default: Date.now()
    },
    totalAmount:{
        type: Number
    },
    paymentId:{
        type:String,
    }
})

const Order = mongoose.model('orders', orderSchema)
const OrderDetails = mongoose.model('orderDetails', orderDetailSchema);
module.exports = {Order, OrderDetails};