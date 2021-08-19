import { Schema, model } from 'mongoose';
import { Account } from './../interfaces/account';

const schema = new Schema<Account>({
    id: { type: Number },
    role: { type: String, required: true},
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true },
    createdAt: { type: String, default: Date.now },
    activated: {type: Boolean, default: true}
})

const AccountModel = model<Account>('Account', schema);

export default AccountModel;