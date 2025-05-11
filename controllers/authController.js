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
