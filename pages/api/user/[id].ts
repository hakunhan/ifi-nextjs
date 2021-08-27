import dbConnect from '../../../lib/dbConnect';
import UserModel from '../../../models/user';

export default async function handler(req, res){
  const { method } = req
  const queryId = parseInt(req.query.id);

  await dbConnect();

  switch (method){
    case 'GET':
      try {
        var user = await UserModel.findOne({_id: queryId});
        if (!user){
          res.status(400).json({ success: false });
          return;
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        var user = await UserModel.findOneAndUpdate({_id: queryId}, req.body, {
            new: true
        })
        if (!user){
            res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: user})
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case 'DELETE':
      try {
        var user = await UserModel.deleteOne({_id: queryId});
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