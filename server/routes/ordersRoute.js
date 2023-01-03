const express = require("express");
const orderModel = require("../models/ordersModel");
const router = express.Router();

router.post("/place-order", async (req, res) => {
    try {
      const neworder = new orderModel(req.body)
      await neworder.save()
      res.send('Order placed successfully')
    } catch (error) {
      res.status(400).json(error);
    }
  });
  
  
  router.get("/get-all-orders", async (req, res) => {
    try {
      const orders = await orderModel.find()
      res.send(orders)
    } catch (error) {
      res.status(400).json(error);
    }
  });

module.exports = router
