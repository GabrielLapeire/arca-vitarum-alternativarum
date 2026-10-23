# Arca Vitarum Alternativarum

Aplicación web desarrollada con React para crear, editar, organizar y consultar personajes de juegos de rol mediante adaptaciones por sistema y versión.

**Demo:** https://gabriellapeire.github.io/arca-vitarum-alternativarum/

## Estado

🚧 En desarrollo.

Actualmente, cuenta con una ficha funcional para **D&D 2024** y gestión de hechizos mediante datos obtenidos de Open5e. La aplicación está diseñada para incorporar otros sistemas de rol en el futuro.

## Funcionalidades

- Crear, editar, consultar y eliminar personajes.
- Gestionar adaptaciones de personajes por sistema y versión.
- Completar y consultar fichas de D&D 2024.
- Calcular modificadores de características y otros valores derivados de la ficha.
- Registrar competencias, equipo, ataques, rasgos y recursos del personaje.
- Consultar, buscar y filtrar hechizos por nombre y nivel.
- Gestionar hechizos preparados, siempre preparados y espacios de conjuro.
- Mostrar descripciones de hechizos con formato Markdown.
- Guardar temporalmente el catálogo de hechizos para reducir las consultas repetidas a la API.
- Alternar entre la edición y la vista de solo lectura.
- Confirmar eliminaciones y advertir sobre cambios sin guardar.
- Exportar personajes individuales o toda la colección a JSON.
- Importar personajes desde archivos JSON sin reemplazar los existentes.

## Tecnologías

- React
- Vite
- JavaScript
- Bootstrap 5
- React Markdown
- LocalStorage
- Open5e API
- Git y GitHub
- GitHub Actions
- GitHub Pages

## Almacenamiento de datos

Los personajes se guardan en el almacenamiento local del navegador mediante `localStorage`. No se necesita una cuenta para utilizar la aplicación, pero los personajes no se sincronizan entre dispositivos o navegadores.

La aplicación permite exportar e importar personajes mediante archivos JSON para facilitar las copias de seguridad y la transferencia de datos.

El catálogo de hechizos se obtiene de Open5e y se guarda temporalmente en el almacenamiento local para reducir las consultas repetidas a la API.

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

- Incorporar pericia Experto y nuevas automatizaciones de D&D.
- Ampliar los catálogos y las fuentes de datos disponibles.
- Incorporar soporte para otros sistemas de rol, comenzando por DaggerHeart.