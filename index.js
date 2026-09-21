require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');

const { PORT = 3000 } = process.env;

const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/newsdb' } = process.env;

mongoose.connect(DB_ADDRESS)
  .then(() => {
    console.log('Conectado a la base de datos MongoDB');
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
  });

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
