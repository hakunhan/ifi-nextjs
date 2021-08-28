import { IUser } from './../../interfaces/user';

export default function UserGenerator (lastId: any) {
    var newId = parseInt(lastId) + 1;

    return {
        _id : newId,
        role : 'user',
        name : '',
        email : '',
        password : '',
        createdAt : new Date(),
        updatedAt : new Date(),
        activated : true,
    }
}