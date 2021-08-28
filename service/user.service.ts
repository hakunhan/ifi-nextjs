import axios from "axios";
import IUser from '../interfaces/user';
import { LocalAPI } from './../components/utils/api';

export async function getUsers(){
    try {
        const queryUsers = await axios.get(LocalAPI+ "api/user",
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          }
        });

        const users:IUser[] = queryUsers.data.data;
        return users;
    }catch(e){
        return null;
    }
}

export async function getUser(id: Number) {
    try {
        const queryUsers = await axios.get(LocalAPI + `api/user/${id}`,
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          }
        });

        const user:IUser = queryUser.data.data;
        return user;
    }catch(e){
        return null;
    }
}

export async function addUser(newUser: any) {
    console.log(newUser);
    try {
        const queryUser = await axios.post(LocalAPI + 'api/user/',
        {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          role: newUser.role,
          activated: newUser.activated,
        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          }
        });

        const user:IUser = queryUser.data.data;
        return user;
    }catch(e){
      console.log(e);
      return null;
    }
}

export async function updateUser(id: Number, editUser: any) {
    try {
        const queryUsers = await axios.put(LocalAPI + `api/user/${id}`,
        {
            user: {
                name: editUser.name,
                email: editUser.email,
                password: editUser.password,
                role: editUser.role,
                activated: editUser.activated,
                updatedAt: new Date()
            }
        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          }
        });

        const user:IUser = queryUser.data.data;
        return user;
    }catch(e){
        return null;
    }
}

export async function deleteUser(id: Number) {
    try {
        const queryUsers = await axios.delete(LocalAPI + `api/user/${id}`,
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          }
        });
        return true;
    }catch(e){
        return false;
    }
}

export async function getLastId(){
    try {
        const lastId = await axios.get(LocalAPI + 'api/user/getLastId',
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          }
        });
        return lastId.data;
    }catch(e){
        return 0;
    }
}

export async function queryLogin(email: String, password: string): IUser | null {
    if (!email && !password){
        return null;
    }

    try {
        const queryUser = await axios.post(LocalAPI + "api/user/findLoginUser",
        {
          user: {
            password: password,
            email: email
          }
        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          }
        });

        const user:IUser = queryUser.data.data;
        return user;
    }catch(e){
        return null;
    }
}

export async function checkDuplicateEmail(email: String): boolean {
    try {
        const queryData = await axios.post(LocalAPI + "api/user/checkDuplicateEmail",
        {
            email: email
        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          }
        });

        const result = queryData.data.duplicate;
        return result;
    }catch(e){
        return null;
    }
}
