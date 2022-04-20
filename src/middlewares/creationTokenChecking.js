import jwtService from '../services/jwtService';
import User from '../models/User';

module.exports = async (req, res, next) => {
  const creationToken = req.query.creation_token || req.body.creation_token;

  try {
    const { data: email } = jwtService.verify(creationToken);

    const userWithInformedEmail = await User.findOne({ where: { email } });
    if (userWithInformedEmail) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.body.email = email;

    return next();
  } catch (error) {
    return res.status(403).json({
      error: 'Unauthorized',
    });
  }
};
