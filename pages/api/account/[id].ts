import dbConnect from '../../../lib/dbConnect';
import AccountModel from '../../../models/account';

export default async function handler(req, res){
  const {
    query: { id },
    method,
  } = req

  await dbConnect();

  switch (method){
    case 'GET':
      try {
        var account = await AccountModel.findOne({id: query.id})
        if (!account){
            res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: account })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case 'PUT':
      try {
        var account = await AccountModel.findOneAndUpdate({id: query.id}, req.body, {
            new: true
        })
        if (!account){
            res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: account})
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case 'DELETE':
      try {
        var account = await AccountModel.deleteOne({id: query.id});
        if (!account){
            res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: account})
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    default:
      res.status(400).json({ success: false })
      break;
  }
}