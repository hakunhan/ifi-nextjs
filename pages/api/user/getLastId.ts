import dbConnect from '../../../lib/dbConnect';
import UserModel from '../../../models/user';

export default async function handler(req, res){
  const method = req.method;

  await dbConnect();

  if (method === 'GET'){
    try {
        var user = await UserModel.findOne({}).sort('-_id');
        res.status(200).json({ success: true, data: user.id })
    } catch (error) {
        res.status(400).json({ success: false })
    }
  }else{
    res.status(400).json({ error: "Wrong method!" })  
  }
}
