import dbConnect from '../../../lib/dbConnect';
import AccountModel from '../../../models/account';

export default async function handler(req, res){
  const method = req.method;

  await dbConnect();

  switch (method){
    case 'GET':
      try {
        var accounts = await AccountModel.find({})
        res.status(200).json({ success: true, data: accounts })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    case 'POST':
      try {
        var account = await AccountModel.create(
          req.body
        )
        res.status(201).json({ success: true, data: account })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break;
    default:
      res.status(400).json({ success: false })
      break;
  }
}

