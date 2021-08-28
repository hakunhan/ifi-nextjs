import dbConnect from '../../../lib/dbConnect';
import ProductModel from '../../../models/product';

export default async function handler(req, res){
  const method = req.method;

  await dbConnect();

  if (method === 'GET'){
    try {
        var product = await ProductModel.findOne({}).sort('-_id');
        res.status(200).json({ success: true, data: product.id })
    } catch (error) {
        res.status(400).json({ success: false })
    }
  }else{
    res.status(400).json({ error: "Wrong method!" })  
  }
}
