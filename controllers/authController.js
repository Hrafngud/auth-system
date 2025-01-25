const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });
    res.redirect('/login');
  } catch (err) {
    res.status(500).send('Error during registration');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.userId = user.id;
    res.redirect('/dashboard');
  } else {
    res.status(401).send('Invalid email or password');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
