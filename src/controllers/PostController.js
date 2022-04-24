/* eslint-disable camelcase */
import Post from '../models/Post';

module.exports = {
  async index(req, res) {
    try {
      const posts = await Post.findAll();

      const postsWithCommentCounter = await Promise.all(posts.map(async (post) => {
        const commentCounter = await post.countComments();
        return { ...post.dataValues, commentCounter };
      }));

      return res.json(postsWithCommentCounter);
    } catch (e) {
      return res.status(500).json({ errors: ['unexpected error'] });
    }
  },

  async store(req, res) {
    const {
      user_from_token: user,
      title,
      content,
    } = req.body;

    try {
      const post = await Post.create({
        user_id: user.id,
        title,
        content,
      });

      return res.json(await Post.findByPk(post.id));
    } catch (e) {
      const isValidationError = e?.name === 'SequelizeValidationError';
      if (isValidationError) {
        return res.status(400).json({ errors: (e.errors || []).map((error) => error.message) });
      }

      return res.status(500).json({ errors: ['unexpected error'] });
    }
  },

  async post(req, res) {
    const { post_id } = req.params;

    try {
      const post = await Post.scope('withComments').findByPk(post_id);

      if (!post) return res.status(404).json({ errors: ['post not found'] });

      return res.json(post);
    } catch (e) {
      return res.status(500).json({ errors: ['unexpected error'] });
    }
  },

  async update(req, res) {
    const { post_id } = req.params;
    const {
      user_from_token: user,
      title,
      content,
    } = req.body;

    try {
      const isModerator = user.roles.map((role) => role.identifier).includes('moderator');
      const post = await Post.findByPk(post_id);
      if (!post || (!isModerator && post.author.id !== user.id)) {
        return res.status(403).json({ errors: ['cannot update this post'] });
      }

      await Post.update({ title, content }, { where: { id: post_id } });
      return res.json(await Post.findByPk(post_id));
    } catch (e) {
      const isValidationError = e?.name === 'SequelizeValidationError';
      if (isValidationError) {
        return res.status(400).json({ errors: (e.errors || []).map((error) => error.message) });
      }

      return res.status(500).json({ errors: ['unexpected error'] });
    }
  },

  async delete(req, res) {
    const { post_id } = req.params;
    const { user_from_token: user } = req.body;

    try {
      const isModerator = user.roles.map((role) => role.identifier).includes('moderator');
      const post = await Post.findByPk(post_id);

      if (!post || (!isModerator && post.author.id !== user.id)) {
        return res.status(403).json({ errors: ['cannot delete this post'] });
      }

      await Post.destroy({ where: { id: post_id } });

      return res.status(204).json();
    } catch (e) {
      return res.status(500).json({ errors: ['unexpected error'] });
    }
  },
};
