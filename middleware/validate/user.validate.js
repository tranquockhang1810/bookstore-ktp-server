class UserValidate {
  static validateUserInput(req, res, next) {
    const { name, email, phone, role, status } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ success: false, message: 'Name is required and must be a string.' });
    }

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ success: false, message: 'Email is required and must be a string.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Email is not valid.' });
    }

    if (phone && typeof phone !== 'string') {
      return res.status(400).json({ success: false, message: 'Phone must be a string.' });
    }

    if (role && typeof role !== 'string') {
      return res.status(400).json({ success: false, message: 'Role must be a string.' });
    }

    if (role && !['admin', 'user'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Role must be "admin" or "user".' });
    }

    if (status && !['active', 'inactive'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status must be "active" or "inactive".' });
    }

    next();
  };
}

module.exports = UserValidate;