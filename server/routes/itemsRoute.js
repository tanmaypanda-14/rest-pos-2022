import express from "express";
// import { getItems } from "../controllers/items.js";
import itemsModel from '../models/itemsModel.js';

const router = express.Router();

// router.get('/get-all-items', getItems);
router.get('/get-all-items', async (req, res) => {
    try{
        const items = await itemsModel.find();
        res.send(items);
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
});

router.post('/add-item', async (req, res) => {
    try{
        const newItem = new itemsModel(req.body);
        await newItem.save();
        res.send("Item added successfully");
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
});

router.post('/edit-item', async (req, res) => {
    try{
        await itemsModel.findOneAndUpdate({ _id: req.body.itemId }, req.body);
        res.send("Item Updated successfully");
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
});

router.post('/delete-item', async (req, res) => {
    try{
        await itemsModel.findOneAndDelete({ _id: req.body.itemId });
        res.send("Item Deleted successfully");
    }
    catch(error){
        res.status(404).json({ message: error.message });
    }
});

export default router;