import mongoose from "mongoose";

const itemsSchema = mongoose.Schema({
    name : { type: String, required: true },
    price : { type: Number, required: true },
    image : { type: String, required: true },
    category : { type: String, required: true },
}, { timestamps: true });

const itemsModel = mongoose.model("items", itemsSchema);

export default itemsModel;