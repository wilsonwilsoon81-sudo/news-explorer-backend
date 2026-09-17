const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config/constants');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      res.status(201).send({ name: user.name, email: user.email });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next({ status: 409, message: 'Este email ya está registrado' });
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === 'Credenciales incorrectas') {
        next({ status: 401, message: 'El correo electrónico o la contraseña son incorrectos' });
      } else {
        next(err);
      }
    });
};

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return next({ status: 404, message: 'Usuario no encontrado' });
      }
      return res.status(200).send({ name: user.name, email: user.email });
    })
    .catch(next);
};

module.exports = { createUser, login, getUserInfo };
