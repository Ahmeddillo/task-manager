const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // "Bearer <token>" string'inden token'ı alma
      token = req.headers.authorization.split(' ')[1];

      // Token doğrulama
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Kullanıcı ID'sini isteğe (req) ekleme
      req.user = { id: decoded.id };

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Yetkisiz erişim, token geçersiz.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Yetkisiz erişim, token bulunamadı.' });
  }
};

module.exports = { protect };
