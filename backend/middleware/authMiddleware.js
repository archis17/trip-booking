exports.adminAuth = (req, res, next) => {
  const { username, password } = req.headers;

  // Hardcoded admin credentials
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'adminpassword';

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
