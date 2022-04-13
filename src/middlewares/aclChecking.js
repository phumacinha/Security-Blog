import User from '../models/User';
import Role from '../models/Role';
import jwtService from '../services/jwtService';

module.exports = (requiredRolesIdentifiers) => async (req, res, next) => {
  const token = req.query.token || req.body.token;

  try {
    // eslint-disable-next-line no-unused-vars
    // const { id: userId } = jwtService.verify(token);
    const userId = token;

    const user = await User.findByPk(userId, {
      include: [
        {
          model: Role,
          as: 'roles',
          attributes: ['identifier'],
          through: { attributes: [] },
        },
      ],
      attributes: ['id'],
    });

    const userRolesIdentifiers = user.dataValues.roles.map((roles) => roles.dataValues.identifier);

    // eslint-disable-next-line arrow-body-style
    const userHasRequiredRole = requiredRolesIdentifiers.some((requiredRole) => {
      return userRolesIdentifiers.includes(requiredRole);
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
