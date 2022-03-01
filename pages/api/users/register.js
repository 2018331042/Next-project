import bcrypt from 'bcryptjs';
import nc from 'next-connect';
import User from '../../../models/Users';
import signToken from '../../../utils/auth';
import db from '../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const existUser = await User.findOne({ email: req.body.email });
  console.log({ existUser });
  if (existUser) {
    return res.status(500).send({ message: 'you already have an account' });
  }
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
  });
  try {
    const user = await newUser.save();

    // await db.disconnect();
    const token = signToken(user);
    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    res.status(500).send({ message: 'user email already registered' });
  }
});

export default handler;
