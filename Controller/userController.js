const User = require('../Model/userModels')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../Config/config');

const register = async (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    password: hashedPassword,
    role
  });
  await user.save();
  res.send('User registered');
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ userId: user._id, role: user.role }, config.jwtSecret, { expiresIn: '12h' });
  res.json({ token });
};

module.exports = {
  register,
  login
};
