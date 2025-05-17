const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let { rollno } = req.body;

    if (!name || !email || !password || !rollno)
      return res
        .status(400)
        .json({ message: 'Name, email, roll number, password are required' });

    if (role === 'student' && !rollno)
      return res
        .status(400)
        .json({ message: 'Roll number is required for students' });
    if (role === 'admin') {
      if (!rollno)
        return res
          .status(400)
          .json({ message: 'Faculty number is required for admin' });
      if (rollno !== process.env.ADMIN_ROLLNO)
        return res
          .status(400)
          .json({ message: 'Invalid faculty number for admin' });
      rollno = null;
    }

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({ name, email, rollno, password, role });
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        rollno: user.rollno,
        role: user.role,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: 'Email and password are required' });

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        rollno: user.rollno,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateMe = async (req, res) => {
  try {
    if (!req.body.name && !req.body.email && !req.body.password)
      return res.status(400).json({ message: 'No fields to update' });

    if (req.body.password && !req.body.newPassword)
      return res.status(400).json({ message: 'New password required' });
    if (req.body.newPassword && !req.body.password)
      return res
        .status(400)
        .json({ message: 'Current password required to set new password' });

    if (
      req.body.newPassword &&
      req.body.password &&
      req.body.password === req.body.newPassword
    )
      return res
        .status(400)
        .json({ message: 'New password cannot be same as current password' });

    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.name === req.body.name)
      return res.status(400).json({ message: 'Name cannot be same' });

    if (
      user.email === req.body.email ||
      (await User.find({ email: req.body.email }))
    )
      return res.status(400).json({ message: 'Email already exists' });

    if (user.name === req.body.name && user.email === req.body.email)
      return res.status(400).json({ message: 'No changes made' });

    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;

    if (req.body.password && (await user.matchPassword(req.body.password)))
      user.password = req.body.newPassword;

    const updatedUser = await user.save();

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
