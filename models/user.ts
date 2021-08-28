import { Model, model, models, Schema } from "mongoose";
import { IUser } from './../interfaces/user';

var UserSchema: Schema = new Schema({
    _id: { type: Number },
    role: { type: String, required: true},
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    activated: {type: Boolean, default: true},
})

export default (models.UserModel
    ? models.UserModel
    : model("UserModel", UserSchema)) as Model<IUser>;