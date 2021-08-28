import { Model, model, models, Schema } from "mongoose";
import { IProduct } from './../interfaces/product';

const noImgUrl = "https://content.optimumnutrition.com/i/on/on-on-ON-US-2-GS-Isolate-24-Bundle_Image_01?locale=en-us,en-gb,*&layer0=$PDP_002$";

var ProductSchema: Schema = new Schema({
    _id: {type: Number}, 
    imgUrl: { type: String, required: false, default: noImgUrl},
    name: { type: String, required: true},
    quantity: { type: Number, required: true, min: 0, default: 0},
    price: { type: Number, required: true, min: 0, default: 0},
    description: { type: String, default: 'No description'},
    status: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

export default (models.ProductModel
    ? models.ProductModel
    : model("ProductModel", ProductSchema)) as Model<IProduct>;