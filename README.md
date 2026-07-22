# Proyecto-Final-Cilsa-Lista-To-Do
# 📋 TaskFlow

TaskFlow es una aplicación web desarrollada con **Node.js, Express, EJS y MySQL** que permite gestionar tareas de forma organizada. Cada usuario puede registrarse, iniciar sesión, crear categorías personalizadas y administrar sus propias tareas mediante una interfaz simple e intuitiva.

---

## 🚀 Características

- Registro e inicio de sesión de usuarios.
- Gestión de categorías.
- Crear, editar y eliminar tareas.
- Cambiar el estado de las tareas.
- Asignar prioridad (Baja, Media o Alta).
- Definir fecha de inicio y vencimiento.
- Buscador por nombre o descripción.
- Filtros por categoría y prioridad.
- Panel principal con resumen de tareas pendientes y completadas.

---

## 🛠 Tecnologías utilizadas

### Backend

- Node.js
- Express.js
- MySQL
- express-session

### Frontend

- EJS
- HTML5
- CSS3
- Bootstrap 5
- JavaScript

---

## 📂 Estructura del proyecto

```
Lista To Do/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── public/
│   ├── Css/
│   ├── Images/
│   └── Js/
├── routes/
├── views/
├── app.js
├── package.json
└── README.md
```

---
## El proyecto utiliza el patrón MVC (Modelo - Vista - Controlador).

Modelos: contienen las consultas SQL.
Controladores: reciben las solicitudes, validan los datos y llaman al modelo.
Vistas: muestran la información al usuario mediante EJS.

## 🗄 Base de datos

La aplicación utiliza una base de datos MySQL llamada **lista_tarea_db**.

Tablas principales:

- usuarios
- categorias
- tareas
- detalle_tarea
- estados

---

## ⚙ Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/usuario/repositorio.git
```

2. Ingresar al proyecto

```bash
cd Lista-To-Do
```

3. Instalar dependencias

```bash
npm install
```

4. Configurar las variables de entorno creando un archivo `.env`

```env
PORT=3000
SESSION_SECRET=tu_clave_secreta
```

5. Importar la base de datos MySQL.

6. Ejecutar la aplicación

```bash
npm run dev
```

o

```bash
npm start
```
---

## 👨‍💻 Autores

Proyecto desarrollado por:

- Milagros Curuchet
- Leila Galiano
- Rocío Diogenes 

Como trabajo final del curso **Full Stack Developer - CILSA**.

---


