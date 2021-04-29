const User = require('../models/User');

const createOrUpdateUser = async (req, res) => {
  console.log({ ha: req.user });
  const { name, email } = req.user;

  const user = await User.findOneAndUpdate({ email }, { name }, { new: true });

  if (user) {
    console.log('user updated');
    res.json(user);
  } else {
    console.log('user created');
    const newUser = await new User({
      email,
      name,
    }).save();

    res.json(newUser);
  }
};

const currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};

module.exports = { createOrUpdateUser, currentUser };
