# FunkoManía

Proyecto educativo de eCommerce desarrollado con React y Vite para Talento Tech. La aplicación permite consultar un catálogo de Funkos, buscar y paginar productos, administrar un carrito y gestionar el catálogo mediante Firebase.

## Funcionalidades

- Catálogo y detalle de productos almacenados en Cloud Firestore.
- Búsqueda en tiempo real y paginación.
- Carrito global con Context API.
- Control de cantidades y stock, eliminación y vaciado del carrito.
- Registro, inicio y cierre de sesión con Firebase Authentication.
- Rutas de administración protegidas mediante el rol de administrador.
- Alta, modificación y eliminación de productos.
- Validaciones, mensajes de error, confirmación antes de eliminar y estados de carga.
- Diseño responsive con React-Bootstrap.
- Componentes estilizados, iconos y metadatos dinámicos.

## Tecnologías utilizadas

- React
- Vite
- React Router
- Firebase Authentication y Cloud Firestore
- React-Bootstrap y Bootstrap
- styled-components
- React Icons
- React Helmet Async

## Instalación local

Se necesita Node.js y npm instalados.

1. Clonar el repositorio.
2. Abrir una terminal en la carpeta del proyecto.
3. Instalar las dependencias:

```bash
npm install
```

4. Copiar `.env.example` como `.env` y completar las variables de Firebase:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

5. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

6. Abrir la dirección que informa Vite, normalmente `http://localhost:5173`.

El archivo `.env` no se incluye en Git. Cada instalación y el despliegue en Vercel deben configurar sus propias variables.

## Comandos disponibles

```bash
npm run dev      # Ejecuta el proyecto en desarrollo
npm run lint     # Revisa el código con ESLint
npm run build    # Genera la versión de producción
npm run preview  # Previsualiza el build localmente
```

El comando `npm run seed` carga en Firestore los productos de `public/data/productos.json`. Debe utilizarse con cuidado para no duplicar información.

## Configuración de Firebase

El proyecto utiliza:

- Authentication con el proveedor correo electrónico/contraseña.
- Una colección de Firestore llamada `productos`.
- Una colección llamada `usuarios`, donde el ID de cada documento es el UID de Authentication.
- Documentos con los campos `nombre`, `precio`, `stock` e `imagen`.

El usuario administrador debe tener un documento en `usuarios/{UID}` con el campo `rol` y el valor `admin`. Los usuarios sin ese rol pueden utilizar el catálogo y el carrito, pero no administrar productos.

Las reglas permiten la lectura pública del catálogo y reservan la administración para el rol `admin`:

```text
function esAdmin() {
  return request.auth != null
    && exists(/databases/$(database)/documents/usuarios/$(request.auth.uid))
    && get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.rol == "admin";
}

match /productos/{productoId} {
  allow read: if true;
  allow create, update, delete: if esAdmin();
}

match /usuarios/{usuarioId} {
  allow read: if request.auth != null && request.auth.uid == usuarioId;
  allow create, update, delete: if false;
}
```

## Despliegue en Vercel

El archivo `vercel.json` redirige las rutas de React Router hacia `index.html`. Esto evita errores 404 al actualizar páginas como `/productos`, `/carrito` o `/producto/:id`.

En la configuración del proyecto de Vercel se deben agregar las seis variables `VITE_FIREBASE_*` indicadas en `.env.example` y realizar un nuevo despliegue.

## Aclaración

FunkoManía es un proyecto educativo. No es una tienda real y los productos, precios y datos se utilizan únicamente con fines de aprendizaje.
