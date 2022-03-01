import nc from 'next-connect';
import Comment from '../../../models/Comment';
import db from '../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const newComment = new Comment({
    name: req.body.name,
    productId: req.body.productId,
    comment: req.body.comment,
  });
  console.log(newComment);
  try {
    const comment = await newComment.save();
    console.log(comment);
    //await db.disconnect();
    res.send({ message: 'comment saved successfully', comment });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default handler;
