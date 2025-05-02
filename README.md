# GodsPlan Store - Reportar Ventas

Este repositorio contiene una aplicación para reportar ventas, gestionar inventario, proveedores y afiliados, con backend en Node.js (Express + SQLite) y frontend en HTML, Tailwind CSS y JavaScript.

## Estructura

- `backend/server.js`: Servidor backend con API REST y base de datos SQLite.
- `index.html`: Interfaz frontend.
- `main.js`: Lógica frontend que consume la API backend.
- `package.json`: Dependencias y scripts.

## Requisitos

- Node.js instalado.

## Instalación y ejecución

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar servidor backend:

```bash
npm start
```

El servidor escuchará en `http://localhost:3001`.

3. Abrir `index.html` en un navegador web.

## Uso

- La aplicación permite gestionar proveedores, afiliados, inventario y reportar ventas.
- Los datos se almacenan en la base de datos SQLite `ventas.db`.
- El frontend interactúa con el backend mediante API REST.

## Notas

- Asegúrate de que el backend esté corriendo para que el frontend funcione correctamente.
- El puerto 3001 debe estar disponible para el backend.

## Contacto

Para dudas o soporte, contacta al desarrollador.
