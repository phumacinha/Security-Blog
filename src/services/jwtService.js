import jwt from 'jsonwebtoken';

const jwtSecret = 'sails.config.secrets.jwtSecret';
const algorithm = 'HS256';

module.exports = {
  issue: (payload) => {
    const token = jwt.sign(payload, jwtSecret, {
      algorithm,
      expiresIn: '2 days',
    });
    return token;
  },

  verify: (token, callback) => jwt.verify(token, jwtSecret, callback),
};
