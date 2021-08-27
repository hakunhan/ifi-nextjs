import { IUser } from './../../interfaces/user';
import getLastId from './../../service/user.service'

export default class UserGenerator implements IUser {
    _id: await getLastId() + 1;
    role: 'user';
    name: '';
    email: '';
    password: '';
    createdAt: new Date();
    updatedAt: new Date();
    activated: true;
}