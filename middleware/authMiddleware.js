const jwt = require('jsonwebtoken');

// Yeh check karega ke user logged in hai ya nahi
const protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer')) {
    try {
      // "Bearer <token>" me se token alag kiya
      token = token.split(' ')[1];
      
      // Token ko verify kiya
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // User ka id aur role request me save ho gaya
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed!" });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied!" });
  }
};

// Role Check karne ke liye function (RBAC - Role Based Access Control)
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Role (${req.user.role}) is not allowed to access this resource` });
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };