const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLoggerMiddleware, errorLogger } = require('./utils/logger');

const app = express();
const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use(requestLoggerMiddleware);

app.get('/', (req, res) => {
  res.send('¡El servidor de News Explorer está corriendo!');
});

app.use('/api', usersRouter);
app.use('/api/articles', articlesRouter);

app.use(errors());

app.use((req, res) => {
  res.status(404).send({ message: 'Ruta no encontrada' });
});

app.use((err, req, res, _next) => {
  const { status = 500, message } = err;

  errorLogger.error({
    status,
    message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  res.status(status).send({
    message: status === 500 ? 'En el servidor ocurrió un error' : message,
  });
});

module.exports = app;
