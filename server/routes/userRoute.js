const express = require("express");
const UserModel = require("../models/userModel");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      userId: req.body.userId,
      password: req.body.password,
      verified: true,
    });
    if (user) {
      res.send(user);
    } else {
      res.status(400).json({ message: "Login failed", user });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});


router.post("/register", async (req, res) => {
  try {
    const { name, userId, password, roles } = req.body;
    if (!name || !userId || !password || !roles) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const duplicate = await UserModel.findOne({ userId }).lean().exec();
    if (duplicate) {
      return res.status(400).json({ message: "User already exists" });
    }
    const userObject = { name, userId, password, roles, verified: false };
    const user = new UserModel(userObject);
    await user.save();
    res.send("User registered successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/get-all-users", async (req, res) => {
  try {
    const users = await UserModel.find();
    if (!users.length) {
      return res.status(400).json({ message: "No users found" });
    }
    res.send(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/edit-user", async (req, res) => {
  try {
    await UserModel.findOneAndUpdate({ _id: req.body.usermodelId }, req.body)
    res.send({message: `User ${req.body.name} updated successfully`});
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/delete-user", async (req, res) => {
  try {
    await UserModel.findOneAndDelete({ _id: req.body.userId });
    res.send("User Deleted successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
