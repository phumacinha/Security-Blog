import jwt from 'jsonwebtoken';

const jwtSecret = 'sails.config.secrets.jwtSecret';
const algorithm = 'HS256';

module.exports = {
  issue: (payload, expiresIn) => {
    const token = jwt.sign(payload, jwtSecret, { algorithm, expiresIn });
    return token;
  },

  verify: (token, callback) => jwt.verify(token, jwtSecret, callback),
};
