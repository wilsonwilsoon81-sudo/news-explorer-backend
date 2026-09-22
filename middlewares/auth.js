const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Autorización requerida' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = { _id: verified._id };
    return next();
  } catch (err) {
    return res.status(401).send({ message: 'Token inválido o expirado' });
  }
};

module.exports = auth;
