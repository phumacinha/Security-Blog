import jwt from 'jsonwebtoken';

const jwtSecret = '6b199e05ab29423992eeb12064baaee3dbeb8aa3e567c411b8f8e53d7f053e74';
const algorithm = 'HS256';

module.exports = {
  issue: (payload, expiresIn) => {
    const token = jwt.sign(payload, jwtSecret, { algorithm, expiresIn });
    return token;
  },

  verify: (token, callback) => jwt.verify(token, jwtSecret, callback),
};
