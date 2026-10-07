const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'branddigix_super_secret_jwt_key_2026';

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Access denied. No authentication token provided.' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ success: false, message: 'Malformed authorization token format. Expected Bearer <token>' });
  }

  const token = parts[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired session token. Please log in again.' });
  }
};

module.exports = {
  verifyAdmin,
  JWT_SECRET
};
