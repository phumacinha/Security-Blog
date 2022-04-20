import jwtService from '../services/jwtService';
import User from '../models/User';

module.exports = async (req, res, next) => {
  const token = req.query.token || req.body.token;

  try {
    // eslint-disable-next-line no-unused-vars
    const { data: userId } = jwtService.verify(token);
    req.body.user_id_from_token = userId;
    req.body.user_from_token = await User.findByPk(userId);

    if (req.body.user_from_token) {
      return next();
    }
    return res.status(403).json({
      error: 'Unauthorized',
    });
  } catch (error) {
    return res.status(403).json({
      error: 'Unauthorized',
    });
  }
};
