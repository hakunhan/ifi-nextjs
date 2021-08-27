import dbConnect from '../../../lib/dbConnect';
import UserModel from '../../../models/user';
import IUser from '../../../models/user'

export default async function handler(req, res){
  const method = req.method;

  await dbConnect();

  switch (method){
    case 'GET':
      try {
        var users: IUser[] = await UserModel.find({})
        res.status(200).json({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case 'POST':
      try {
        var user: IUser = await UserModel.create(
          req.body
        )
        res.status(201).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false, error })
      }
      break;
    default:
      res.status(400).json({ success: false })
      break;
  }
}