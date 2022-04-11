import jwtService from '../services/jwtService';

module.exports = async (req, res, next) => {
  const token = req.query.token || req.body.token;

  try {
    // eslint-disable-next-line no-unused-vars
    const response = jwtService.verify(token);

    return next();
  } catch (error) {
    return res.status(403).json({
      error: 'Unauthorized',
    });
  }
};
