import jwtService from '../services/jwtService';
import User from '../models/User';
import { isEmail } from '../services/validationService';

module.exports = async (req, res, next) => {
  const creationToken = req.query.creation_token || req.body.creation_token;

  try {
    const { data: email } = jwtService.verify(creationToken);
    const userWithInformedEmail = email && await User.findOne({ where: { email } });

    if (!isEmail(email, true) || userWithInformedEmail) {
      return res.status(403).json({ errors: ['invalid token'] });
    }

    req.body.email = email;

    return next();
  } catch (error) {
    return res.status(403).json({ errors: ['unauthorized'] });
  }
};
