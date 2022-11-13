import express from "express";
import UserModel from "../models/userModel.js";
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await findOne({
      userId: req.body.userId,
      password: req.body.password,
      verified: true,
    });
    if (user) {
      res.send(user);
    } else {
      res.status(400).json({ message: "Login failed" , user });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const newuser = new UserModel({ ...req.body, verified: false });
    await newuser.save();
    res.send("User Registered successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;