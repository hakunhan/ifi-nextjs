import dbConnect from '../../../lib/dbConnect';
import AccountModel from '../../../models/account';

export default async function handler(req, res){
  const {method} = req;
  const {account} = req.body;

  await dbConnect();

  if (method === 'GET'){
    try {
        var loginAccount = await AccountModel.findOne({email: account.email, password: account.password});
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(400).json({ success: false })
    }
  }else{
    res.status(400).json({ error: "Wrong method!" })  
  }
}