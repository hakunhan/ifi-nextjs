import mongoose from 'mongoose'
import { Account } from './../interfaces/account';

var AccountSchema = new mongoose.Schema<Account>({
    id: { type: Number },
    role: { type: String, required: true},
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    activated: {type: Boolean, default: true}
})

export default mongoose.models.AccountSchema || mongoose.model('Account', AccountSchema)