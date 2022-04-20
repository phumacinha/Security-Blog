/* eslint-disable camelcase */
// import User from '../models/User';
import Comment from '../models/Comment';
import Post from '../models/Post';

module.exports = {
  async store(req, res) {
    const { post_id } = req.params;
    const {
      user_from_token: user,
      content,
    } = req.body;

    const post = await Post.findByPk(post_id);

    if (!post) {
      return res.status(502).json({ error: 'Cannot send comment' });
    }

    const comment = await Comment.create({
      content,
      user_id: user.id,
      post_id,
    });

    return res.json(await Comment.scope('embedded').findByPk(comment.id));
  },

  async delete(req, res) {
    const {
      post_id,
      comment_id,
    } = req.params;
    const { user_from_token: user } = req.body;

    const comment = await Comment.findOne({
      where: {
        id: comment_id,
        post_id,
      },
    });

    const isModerator = user.roles.map((role) => role.identifier).includes('moderator');

    if (!comment || (!isModerator && comment.user_id !== user.id)) {
      return res.status(502).json({ error: 'Cannot delete comment' });
    }

    await Comment.destroy({ where: { id: post_id } });

    return res.status(204).json();
  },
};
