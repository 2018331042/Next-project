import nc from 'next-connect';
import Product from '../../models/Product';
import User from '../../models/Users';
import data from '../../utils/data';
import db from '../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await db.disconnect();
  res.send('seeded successfully');
});

export default handler;
