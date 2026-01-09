# astec-api

API REST construida con Node.js, Express, TypeScript y MySQL.

## Requisitos

- Node.js (LTS recomendado)
- npm
- MySQL

## Instalacion

1) Instala dependencias:

```bash
npm install
```

2) Crea tu archivo `.env` en la raiz del proyecto con las variables necesarias:

```bash
PORT=3000
DB_HOST=localhost
DB_USER=usuario
DB_PASSWORD=tu_password
DB_NAME=astecdb
DB_PORT=3306
JWT_SECRET=tu_secreto
```

3) Asegura que la base de datos y el esquema existan en MySQL con el `DB_NAME` configurado.

## Ejecutar el proyecto

- Desarrollo (recarga automatica):

```bash
npm run dev
```

- Produccion:

```bash
npm run build
npm start
```

La API queda disponible en `http://localhost:PORT` (por defecto `3000`).

## Rutas base

- `/clients`
- `/employees`
- `/apostamientos`
- `/assignments`
- `/activities`
- `/auth`
