# Prueba Técnica - Sistema de Inventario con Docker

## Descripción
Esta prueba técnica consiste en dockerizar un sistema de inventario que utiliza múltiples servicios. El candidato deberá crear los archivos Dockerfile y docker-compose.yml necesarios para ejecutar la aplicación completa.

## Objetivo
Demostrar conocimientos en:
- Dockerización de aplicaciones Node.js/React
- Configuración de servicios con Docker Compose
- Manejo de redes y volúmenes en Docker
- Conexión entre múltiples servicios (bases de datos, caché, etc.)

## Servicios Requeridos

### Frontend (Puerto 3000)
- Aplicación React con TypeScript
- Debe conectarse al backend
- Requiere:
  - Node 16
  - npm install para dependencias
  - Comando: npm start

### Backend (Puerto 4000)
- API REST con Express y TypeScript
- Conexión a PostgreSQL, MongoDB y Redis
- Requiere:
  - Node 16
  - npm install para dependencias
  - Variables de entorno para conexiones
  - Comando: npm start

### PostgreSQL (Puerto 5432)
- Almacenamiento principal de productos
- Requiere:
  - Base de datos: inventario
  - Usuario: user
  - Contraseña: password
  - Volumen persistente para datos
  - Script inicial: init.sql

### MongoDB (Puerto 27017)
- Sistema de caché secundario
- Requiere:
  - Base de datos: cache
  - Volumen persistente para datos

### Redis (Puerto 6379)
- Sistema de caché primario
- Sin autenticación requerida

## Variables de Entorno Necesarias

env

POSTGRES_URI=postgres://user:password@postgres:5432/inventario

MONGODB_URI=mongodb://mongodb:27017/cache

REDIS_URI=redis://redis:6379

## Estructura del Proyecto
El proyecto incluye frontend y backend con sus respectivas configuraciones de TypeScript y dependencias.

## Tareas a Realizar
1. Crear Dockerfile para frontend
2. Crear Dockerfile para backend
3. Crear docker-compose.yml que:
   - Configure todos los servicios
   - Establezca las dependencias correctas
   - Configure volúmenes persistentes
   - Maneje variables de entorno
   - Configure redes entre servicios

## Criterios de Evaluación
- Correcta configuración de servicios
- Uso apropiado de volúmenes
- Manejo de dependencias entre servicios
- Configuración de variables de entorno
- Optimización de imágenes Docker
- Persistencia de datos
