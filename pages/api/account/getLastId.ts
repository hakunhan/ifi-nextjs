import dbConnect from '../../../lib/dbConnect';
import AccountModel from '../../../models/account';

export default async function handler(req, res){
  const method = req.method;

  await dbConnect();

  if (method === 'GET'){
    try {
        var account = await AccountModel.findOne({}).sort('-id');
        res.status(200).json({ success: true, data: account.id })
    } catch (error) {
        res.status(400).json({ success: false })
    }
  }else{
    res.status(400).json({ error: "Wrong method!" })  
  }
}
