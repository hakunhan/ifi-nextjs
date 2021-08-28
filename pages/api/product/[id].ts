import dbConnect from '../../../lib/dbConnect';
import ProductModel from '../../../models/product';

export default async function handler(req, res){
  const { method } = req
  const queryId = parseInt(req.query.id);

  await dbConnect();

  switch (method){
    case 'GET':
      try {
        var product = await ProductModel.findOne({_id: queryId});
        if (!product){
          res.status(400).json({ success: false });
          return;
        }
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        var product = await ProductModel.findOneAndUpdate({_id: queryId}, req.body, {
            new: true
        })
        if (!product){
            res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: product})
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case 'DELETE':
      try {
        var product = await ProductModel.deleteOne({_id: queryId});
        res.status(200).json({ success: true})
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    default:
      res.status(400).json({ success: false })
      break;
  }
}