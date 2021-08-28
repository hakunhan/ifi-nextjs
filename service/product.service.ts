import axios from "axios";
import IProduct from '../interfaces/product';
import { LocalAPI } from './../components/utils/api';

export async function getProducts(){
    try {
        const queryProducts = await axios.get(LocalAPI+ "api/product",
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          }
        });

        const products:IProduct[] = queryProducts.data.data;
        return products;
    }catch(e){
        return null;
    }
}

export async function getProduct(id: Number) {
    try {
        const queryProduct = await axios.get(LocalAPI + `api/product/${id}`,
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          }
        });

        const product:IProduct = queryProduct.data.data;
        return product;
    }catch(e){
        console.log(e);
        return null;
    }
}

export async function addProduct(newProduct: any) {
    console.log(newProduct);
    try {
        const queryProduct = await axios.post(LocalAPI + 'api/product/',
        {
          _id: newProduct._id,
          imgUrl: newProduct.imgUrl,
          name: newProduct.name,
          quantity: newProduct.quantity,
          price: newProduct.price,
          description: newProduct.description,
          status: newProduct.status
        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          }
        });

        const product:IProduct = queryProduct.data.data;
        return product;
    }catch(e){
      console.log(e);
      return null;
    }
}

export async function updateProduct(id: Number, editProduct: any) {
    try {
        const queryProducts = await axios.put(LocalAPI + `api/product/${id}`,
        {
            product: {
                imgUrl: newProduct.imgUrl,
                name: newProduct.name,
                quantity: newProduct.quantity,
                price: newProduct.price,
                description: newProduct.description,
                status: newProduct.status,
                updatedAt: new Date()
            }
        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          }
        });

        const product:IProduct = queryProduct.data.data;
        return product;
    }catch(e){
        return null;
    }
}

export async function deleteProduct(id: Number) {
    try {
        const queryProducts = await axios.delete(LocalAPI + `api/product/${id}`,
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
        const lastId = await axios.get(LocalAPI + 'api/product/getLastId',
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
