import User from '../models/User';
import EncryptorService from '../services/EncryptorService';

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ errors: ['email or password missing'] });
    }

    try {
      const user = await User.findOne({
        where: { email },
        attributes: { include: ['password'] },
      });

      if (user && EncryptorService.comparePassword(password, user)) {
        const token = EncryptorService.generateToken(user.id);
        res.cookie('access-token', token);

        delete user.dataValues.password;
        return res.status(200).json({
          token: EncryptorService.generateToken(user.id),
          user,
        });
      }

      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await sleep(3000);
      return res.status(401).json({ errors: ['invalid credentials'] });
    } catch (error) {
      return res.status(500).json({ errors: ['unexpected error'] });
    }
  },
};
