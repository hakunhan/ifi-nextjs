import dbConnect from '../../../lib/dbConnect';
import UserModel from '../../../models/user';

export default async function handler(req, res){
  const {method} = req;
  const {email} = req.body;

  await dbConnect();

  if (method === 'POST'){
    try {
      var user = await UserModel.findOne({email: email});
      if (user){
        res.status(200).json({ duplicate: true })
      }else{
        res.status(200).json({ duplicate: false }) 
      }
    } catch (error) {
      res.status(400).json({ error: error })
    }
  }else{
    res.status(400).json({ error: "Wrong method!" })  
  }
}