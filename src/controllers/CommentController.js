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

    try {
      const post = await Post.findByPk(post_id);

      if (!post) {
        return res.status(400).json({ errors: ['cannot send comment'] });
      }
    } catch (e) {
      return res.status(400).json({ errors: ['cannot send comment'] });
    }

    try {
      const comment = await Comment.create({
        content,
        user_id: user.id,
        post_id,
      });

      return res.json(await Comment.scope('embedded').findByPk(comment.id));
    } catch (e) {
      const isValidationError = e?.name === 'SequelizeValidationError';
      if (isValidationError) {
        return res.status(400).json({ errors: (e.errors || []).map((error) => error.message) });
      }

      return res.status(500).json({ errors: ['unexpected error'] });
    }
  },

  async delete(req, res) {
    const {
      post_id,
      comment_id,
    } = req.params;
    const { user_from_token: user } = req.body;

    try {
      const comment = await Comment.findOne({
        where: {
          id: comment_id,
          post_id,
        },
      });

      const isModerator = user.roles.map((role) => role.identifier).includes('moderator');

      if (!comment || (!isModerator && comment.user_id !== user.id)) {
        return res.status(403).json({ errors: ['cannot delete comment'] });
      }

      await Comment.destroy({
        where: {
          id: comment_id,
          post_id,
        },
      });

      return res.status(204).json();
    } catch (e) {
      return res.status(500).json({ errors: ['unexpected error'] });
    }
  },
};
