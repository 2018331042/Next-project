import bcrypt from 'bcryptjs';
import nc from 'next-connect';
import Product from '../../../models/Product';
import User from '../../../models/Users';
import signToken from '../../../utils/auth';
import db from '../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    console.log('login error');
    res.status(401).send({ message: 'invalid email or password' });
  }
});

export default handler;
