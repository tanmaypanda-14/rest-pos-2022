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

export default router;