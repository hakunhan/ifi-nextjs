import dbConnect from '../../../lib/dbConnect';
import ProductModel from '../../../models/product';
import IProduct from '../../../models/product'

export default async function handler(req, res){
  const method = req.method;

  await dbConnect();

  switch (method){
    case 'GET':
      try {
        var products: IProduct[] = await ProductModel.find({})
        res.status(200).json({ success: true, data: products })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case 'POST':
      try {
        var product: IProduct = await ProductModel.create(
          req.body
        )
        res.status(201).json({ success: true, data: product })
      } catch (error) {
        res.status(400).json({ success: false, error })
      }
      break;
    default:
      res.status(400).json({ success: false })
      break;
  }
}