import User from '../models/User';
import EncryptorService from '../services/EncryptorService';

module.exports = {
  login: async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json('login-or-password-missing');
    }

    try {
      const userToCheck = await User.findOne({
        where: { login },
        attributes: ['password'],
      });

      const user = await User.findOne({
        where: { login },
      });

      if (userToCheck && EncryptorService.comparePassword(password, userToCheck)) {
        return res.status(200).json({
          token: EncryptorService.generateToken(user.id),
          user,
        });
      }
      return res.status(401).json('incorrect-credentials');
    } catch (error) {
      return res.status(400).json({
        code: error.code,
        details: error.details,
      });
    }
  },
};
