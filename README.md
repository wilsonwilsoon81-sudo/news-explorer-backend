# News Explorer - Backend

API RESTful para el proyecto final **News Explorer** de Practicum. Este backend gestiona la autenticación de usuarios, la autorización mediante JWT y el almacenamiento persistente de artículos de noticias guardados en una base de datos MongoDB.

🔗 **API en Producción:** [https://news-explorer-backend-ig2o.onrender.com](https://news-explorer-backend-ig2o.onrender.com)

---

## 🛠️ Tecnologías Utilizadas

- **Node.js** y **Express.js** (Framework web)
- **MongoDB** y **Mongoose** (Base de datos y ODM)
- **JSON Web Token (JWT)** (Autenticación y autorización)
- **Bcryptjs** (Encriptación de contraseñas)
- **Celebrate / Joi** (Validación de esquemas de datos)
- **Winston** (Sistema de registro de logs en formato JSON)
- **Helmet** y **CORS** (Seguridad básica)

---

## 🚀 Instalación y Ejecución Local

1. Clonar el repositorio
```bash
git clone https://github.com/wilsonwilsoon81-sudo/news-explorer-backend.git
```
2. Instalar dependencias
```bash
npm install
```
3. Ejecutar en modo desarrollo
El proyecto está configurado para funcionar en modo desarrollo sin necesidad de un archivo .env, utilizando valores por defecto seguros para entorno local.
```bash
npm run dev
```
El servidor se iniciará en http://localhost:3000 y se conectará a la base de datos local de MongoDB.

4. Ejecutar en modo producción (con variables de entorno)
Crea un archivo .env en la raíz del proyecto con las siguientes variables:
```env
NODE_ENV=production
JWT_SECRET=tu_clave_secreta_super_segura_aqui
DB_ADDRESS=mongodb+srv://usuario:contraseña@cluster.mongodb.net/newsdb?retryWrites=true&w=majority
```
Luego ejecuta:
```bash
npm start
```
---

## 📡 Endpoints Principales

---

## 🔐 Autenticación (Públicos)

POST /api/signup - Registra un nuevo usuario.
POST /api/signin - Inicia sesión y devuelve un token JWT.

---

## 👤 Usuarios (Protegidos con JWT)

GET /api/users/me - Obtiene la información del usuario autenticado (nombre y email).

---

## 📰 Artículos (Protegidos con JWT)

GET /api/articles - Obtiene todos los artículos guardados por el usuario autenticado.
POST /api/articles - Guarda un nuevo artículo en la base de datos.
DELETE /api/articles/:articleId - Elimina un artículo guardado (solo si pertenece al usuario autenticado).

---

## 📝 Sistema de Logs

El proyecto implementa un sistema de registro de eventos utilizando Winston:
logs/request.log: Registra todas las solicitudes HTTP entrantes en formato JSON.
logs/error.log: Registra los errores del servidor y trazas de pila (stack traces) en formato JSON.
Nota: La carpeta logs/ está incluida en .gitignore y no se sube al repositorio.

---

## 👨‍💻 Autor

Desarrollado por Wilson Rolando Herrera Romero como parte del proyecto final del curso de Desarrollo Web Full Stack de Practicum.

---
