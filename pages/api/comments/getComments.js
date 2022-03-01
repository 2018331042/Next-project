import nc from 'next-connect';
import Comment from '../../../models/Comment';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  try {
    const comments = await Comment.find({ productId: req.body.productId });
    res.send(comments);
  } catch (err) {
    res.send(err.message);
  }
});

export default handler;
