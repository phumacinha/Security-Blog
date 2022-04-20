import User from '../models/User';
import jwtService from '../services/jwtService';

module.exports = (requiredRolesIdentifiers) => async (req, res, next) => {
  const token = req.query.token || req.body.token;

  try {
    const { data: userId } = jwtService.verify(token);

    const user = await User.findByPk(userId);
    const roles = user.roles.map((role) => role.identifier);

    // eslint-disable-next-line arrow-body-style
    const userHasRequiredRole = requiredRolesIdentifiers.some((requiredRole) => {
      return roles.includes(requiredRole);
    });

    if (userHasRequiredRole) {
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
