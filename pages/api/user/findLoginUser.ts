import dbConnect from '../../../lib/dbConnect';
import UserModel from '../../../models/user';

export default async function handler(req, res){
  const {method} = req;
  const {user} = req.body;

  await dbConnect();

  if (method === 'POST'){
    try {
      if (user.email.length == 0 || user.password.length == 0) {
        res.status(400).json({ success: false });
        return;
      }

      var loginUser = await UserModel.findOne({email: user.email, password: user.password});
      if (loginUser){
        res.status(200).json({ success: true, data: loginUser })
      }else{
        res.status(400).json({ success: false }) 
      }
    } catch (error) {
      res.status(400).json({ success: false })
    }
  }else{
    res.status(400).json({ error: "Wrong method!" })  
  }
}