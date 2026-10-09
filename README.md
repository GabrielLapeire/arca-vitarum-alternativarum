# Arca Vitarum Alternativarum

Aplicación web desarrollada con React para crear, editar, organizar y consultar personajes de juegos de rol mediante adaptaciones por sistema y versión.

## Estado

🚧 En desarrollo.

Actualmente, cuenta con soporte para **D&D 2024**, incluyendo la gestión de personajes y hechizos. La aplicación está diseñada para poder incorporar otros sistemas de rol en el futuro.

## Funcionalidades

- Crear, editar, consultar y eliminar personajes.
- Organizar personajes mediante adaptaciones por sistema y versión.
- Completar y consultar fichas de personajes de D&D 2024.
- Calcular modificadores de características y otros valores derivados de la ficha.
- Consultar el catálogo de hechizos mediante la API de Open5e.
- Buscar hechizos por nombre y filtrar por nivel.
- Gestionar los hechizos de cada personaje y sus espacios de conjuro.
- Guardar localmente el catálogo de hechizos para reducir las consultas repetidas a la API.
- Alternar entre la edición y la vista de solo lectura de una ficha.

## Tecnologías

- React
- Vite
- JavaScript
- Bootstrap 5
- LocalStorage
- Open5e API

## Almacenamiento de datos

Los personajes se guardan en el almacenamiento local del navegador mediante `localStorage`. No se necesita una cuenta para utilizar la aplicación, pero los personajes no se sincronizan entre dispositivos o navegadores.

El catálogo de hechizos se obtiene de la API de Open5e y se guarda temporalmente en el almacenamiento local para reducir las consultas repetidas.

## Ejecución local

Se necesita tener Node.js y npm instalados.

1. Clonar el repositorio y entrar en la carpeta del proyecto.
2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abrir en el navegador la dirección local indicada por Vite.

## Próximos pasos

- Completar la revisión visual y adaptable a distintos tamaños de pantalla.
- Incorporar soporte para otros sistemas de rol, comenzando por DaggerHeart.