import { IProduct } from './../../interfaces/product';

export default function ProductGenerator (lastId: any) {
    const noImgUrl = "https://content.optimumnutrition.com/i/on/on-on-ON-US-2-GS-Isolate-24-Bundle_Image_01?locale=en-us,en-gb,*&layer0=$PDP_002$";
    var newId = parseInt(lastId) + 1;

    return {
        _id : newId,
        imgUrl : noImgUrl,
        name : '',
        quantity : 0,
        price : 0,
        description: 'No description',
        status : false,
        createdAt : new Date(),
        updatedAt : new Date(),
    }
}