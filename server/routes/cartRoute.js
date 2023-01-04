const express = require("express");
const router = express.Router();
const { Cart } = require("../models/cartModel");
const ItemModel = require("../models/itemsModel");
const UserModel = require("../models/userModel");

const populate = {
    path: "cartDetails",
    populate: {
      path: "_item",
      model: "items",
    },
  };

router.post("/addToCart", async (req, res)=>{
    const userCart = await Cart.findOne({ _userId: req.body.userId });
  const item = await ItemModel.findById(req.body._itemId);

  const cartDetails = {
    _item: req.body._itemId,
    quantity: req.body.quantity,
    price: req.body.price,
    amount: req.body.price * req.body.quantity,
  };
      // if user cart already exists,
  if (userCart) {
    // find and update quantity if item exist already in cart
    Cart.findOneAndUpdate(
      {
        _userId: req.body.userId,
        "cartDetails._item": req.body._itemId,
      },
      {
        $inc: {
          "cartDetails.$.quantity": req.body.quantity,
          "cartDetails.$.amount": item.price * req.body.quantity,
        },
      },
      { new: true }
    )
      .populate(populate)
      .exec()
      .then((data, error) => {
        if (error) return res.json({ status: false, error });
        if (data) {
          return res.status(200).json({
            status: true,
            message: "Add Item to cart successfully!",
            data,
          });
        } else {
          //if item doesn't exist in cart, push item to cart
          Cart.findOneAndUpdate(
            {
              _userId: req.body.userId,
            },
            {
              $push: {
                cartDetails: {
                  ...cartDetails,
                },
              },
            },
            { new: true }
          )
            .populate(populate)
            .exec()
            .then((data, error) => {
              if (error) return res.json({ status: false, error });
              return res.status(200).json({
                status: true,
                message: "Add item to cart successfully!",
                data,
              });
            });
        }
      });
  } else {
    // if user cart does not exist, add new user cart
    const newCart = new Cart({
      _userId: req.body.userId,
      cartDetails,
    });
    newCart.save((error, data) => {
      if (error) return res.status(400).json({ status: false, error });
      return res.status(200).json({
        status: true,
        message: "Add item to cart successfully!",
        data,
      });
    });
  }
});

router.put("/updateCartItem", async (req, res) => {
    const _itemId = req.body._itemId;
    const quantity = req.body.quantity;
  
    const item = await ItemModel.findById(_itemId);
    Cart.findOneAndUpdate(
      {
        _userId: req.body.userId,
        "cartDetails._item": _itemId,
      },
      {
        $set: {
          "cartDetails.$.quantity": quantity,
          "cartDetails.$.amount": quantity * item.price,
        },
      },
      { new: true }
    )
      .populate(populate)
      .exec((error, data) => {
        if (error) return res.status(400).json({ status: false, error });
        return res.status(200).json({
          status: true,
          message: "Item in cart has been updated successfully!",
          data,
        });
      });
  });
  
  router.put("/removeCartItem/:id", async (req, res) => {
    const _itemId = req.params.id;
  
    Cart.findOneAndUpdate(
      {
        _userId: req.body.userId,
      },
      {
        $pull:{
          cartDetails: {_item: _itemId}
        }
      },
      { new: true }
    )
      .populate(populate)
      .exec((error, data) => {
        if (error) return res.status(400).json({ status: false, error });
        return res.status(200).json({
          status: true,
          message: "Item in cart has been removed successfully!",
          data,
        });
      });
  });
  
  router.get("/", (req, res) => {
    // const search_params = current_url.searchParams;
    var userId = req.query.userId
    Cart.findOne({ _userId: userId })
      .populate(populate)
      .exec((error, data) => {
        if (error) return res.json({ status: false, error });
        return res.status(200).json({
          status: true,
          message: "Get user cart successfully!",
          data,
        });
      });
  });

  module.exports = router;