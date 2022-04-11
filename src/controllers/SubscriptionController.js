import Subscription from "../models/Subscription";
import User from "../models/User";
import AdventureType from "../models/AdventureType";
import Adventure from "../models/Adventure";

module.exports = {
  async store(req, res) {
    const { user_id } = req.params;
    const { adventure_type_id, adventure_id } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) return res.status(400).json({ error: "User not found" });
    if (user.user_type === 0)
      return res
        .status(400)
        .json({ error: "User type not allowed to subscribe to adventure" });

    const adventureType = await AdventureType.findByPk(adventure_type_id);
    if (!adventureType)
      return res.status(400).json({ error: "Adventure type not found" });

    const adventure = await Adventure.findByPk(adventure_id);
    if (!adventure)
      return res.status(400).json({ error: "Adventure not found" });

    const subscription = await Subscription.create({
      user_id,
      adventure_id,
      adventure_type_id
    });

    return res.json(subscription);
  },
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);
    if (!user) return res.status(400).json({ error: "User not found" });
    if (user.user_type === 0)
      return res
        .status(400)
        .json({ error: "User type does not have subscriptions" });

    const subscription = await Subscription.findAll({
      where: {
        user_id
      },
      include: [
        {
          association: "adventure"
        },
        {
          association: "adventure_type"
        }
      ]
    });

    if (!subscription) return res.json([]); // TODO: implement empty array response

    return res.json(subscription);
  },
  async adventures(req, res) {
    const { adventure_id } = req.params;

    const adventure = await Adventure.findByPk(adventure_id);

    if (!adventure)
      return res.status(400).json({ error: "Adventure not found" });

    const subscription = await Subscription.findAll({
      where: {
        adventure_id
      },
      include: [
        {
          association: "adventure"
        },
        {
          association: "adventure_type"
        }
      ]
    });

    if (!subscription) return res.json([]); // TODO: implement empty array response

    return res.json(subscription);
  },
  async update(req, res) {
    const { subscription_id } = req.params;
    const { adventure_type_id } = req.body;

    const subscription = await Subscription.findByPk(subscription_id);

    if (!subscription)
      return res.status(502).json({ error: "Subscription not found" });

    const response = await Subscription.update(
      {
        adventure_type_id
      },
      {
        returning: true,
        where: { id: subscription_id }
      }
    );

    return res.json(response[1]);
  },
  async delete(req, res) {
    const { subscription_id } = req.params;

    const subscription = await Subscription.findByPk(subscription_id);

    if (!subscription)
      return res.status(502).json({ error: "Subscription not found" });

    const response = await Subscription.destroy({
      where: { id: subscription_id }
    });

    return res.json(response);
  }
};
