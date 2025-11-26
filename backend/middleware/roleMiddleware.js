// Middleware to check if user is admin
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
};

// Middleware to check if user is seller
exports.isSeller = (req, res, next) => {
  if (req.user && req.user.role === 'seller') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied. Seller privileges required.' });
  }
};

// Middleware to check if user is buyer
exports.isBuyer = (req, res, next) => {
  if (req.user && req.user.role === 'buyer') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied. Buyer privileges required.' });
  }
};
