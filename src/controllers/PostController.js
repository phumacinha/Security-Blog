/* eslint-disable camelcase */
import Post from '../models/Post';

module.exports = {
  async index(req, res) {
    const posts = await Post.findAll();

    const postsWithCommentCounter = await Promise.all(posts.map(async (post) => {
      const commentCounter = await post.countComments();
      return { ...post.dataValues, commentCounter };
    }));

    return res.json(postsWithCommentCounter);
  },

  async store(req, res) {
    const {
      user_from_token: user,
      title,
      content,
    } = req.body;

    // const user = await User.findByPk(user_id);

    if (!user) return res.status(400).json({ error: 'User not found' });

    const post = await Post.create({
      user_id: user.id,
      title,
      content,
    });

    return res.json(await Post.findByPk(post.id));
  },

  async post(req, res) {
    const { post_id } = req.params;

    const post = await Post.scope('withComments').findByPk(post_id);

    if (!post) return res.status(404).json({ error: 'Post not found' });

    return res.json(post);
  },

  async update(req, res) {
    const { post_id } = req.params;
    const {
      user_from_token: user,
      title,
      content,
    } = req.body;

    const isModerator = user.roles.map((role) => role.identifier).includes('moderator');

    const post = await Post.findByPk(post_id);

    if (!post || (!isModerator && post.author.id !== user.id)) {
      return res.status(502).json({ error: 'Cannot update this post' });
    }

    await Post.update({ title, content }, { where: { id: post_id } });

    return res.json(await Post.findByPk(post_id));
  },

  async delete(req, res) {
    const { post_id } = req.params;
    const { user_from_token: user } = req.body;

    const isModerator = user.roles.map((role) => role.identifier).includes('moderator');

    const post = await Post.findByPk(post_id);

    if (!post || (!isModerator && post.author.id !== user.id)) {
      return res.status(502).json({ error: 'Cannot delete this post' });
    }

    await Post.destroy({ where: { id: post_id } });

    return res.status(204).json();
  },

  // async delete(req, res) {
  //   const { adventure_id } = req.params;

  //   const adventure = await Adventure.findByPk(adventure_id);

  //   if (!adventure)
  //     return res.status(502).json({ error: "Adventure not found" });

  //   const response = await Adventure.destroy({
  //     where: { id: adventure_id }
  //   });

  //   return res.json(response);
  // }
};
