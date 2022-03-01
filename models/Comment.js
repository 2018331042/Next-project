import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  productId: { type: String, required: true },
  comment: { type: String, required: true },
});

const Comment =
  mongoose.models.Comment || mongoose.model('Comment', CommentSchema);

export default Comment;
