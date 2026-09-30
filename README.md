# Tarea 4 — IMDB Top 250 con Nuxt Content y Pinia

**Curso:** EIF-511 Arquitectura de Información
**Estudiante:** Isaías Víquez Soto 402580631

**Sitio publicado:** https://tarea4-arqui.vercel.app/

## Dataset

[IMDB Top 250 Movies Dataset](https://www.kaggle.com/datasets/rajugc/imdb-top-250-movies-dataset) (Kaggle, licencia CC BY-NC-SA 4.0), guardado como `content/movies.csv`.

- 250 registros y 13 columnas: `rank, name, year, rating, genre, certificate, run_time, tagline, budget, box_office, casts, directors, writers`.
- Los encabezados ya venían en minúscula, sin espacios ni tildes, así que el archivo se usa sin cambios.
- El identificador único es `rank` (1–250), y también es el parámetro de la URL de detalle (`/movies/1`, `/movies/2`, …).

## Cumplimiento de los requisitos

| # | Requisito | Dónde se cumple |
|---|-----------|-----------------|
| 1 | Dataset como colección `data` de Nuxt Content | [content.config.ts](content.config.ts): colección `movies` con `type: 'data'`, `source: 'movies.csv'` y un esquema zod para las 13 columnas. |
| 2 | Store de Pinia con acciones para cargar el listado y un registro | [app/stores/movies.ts](app/stores/movies.ts): acciones `fetchMovies()` y `fetchMovie(rank)`. El listado ([app/pages/movies/index.vue](app/pages/movies/index.vue)) enlaza al detalle y lee los datos del store. |
| 3 | Detalle con todos los campos y enlaces al anterior y al siguiente | [app/pages/movies/[rank].vue](app/pages/movies/[rank].vue): tabla con los 13 campos y botones ← anterior / siguiente →. La primera película no tiene "anterior" y la última no tiene "siguiente". Un `rank` inexistente (p. ej. `/movies/999`) devuelve 404. |
| 4 | Getter con el promedio de un campo numérico | Getter `averageRating` (promedio de `rating`, redondeado a 2 decimales), mostrado en el listado. |
| 5 | Favoritos que se mantienen al recargar | `favorites` usa `useCookie`: se marcan con ★/☆ desde el listado o el detalle y se ven en [app/pages/favorites.vue](app/pages/favorites.vue). El encabezado muestra el contador. |
| 6 | Publicación en un hosting | Vercel, desplegado desde el repositorio de GitHub: https://tarea4-arqui.vercel.app/ |
| 7 | Entrega en ZIP sin `node_modules` | `tarea4-arqui-isaiasviquez.zip` |

## Rutas

- `/` → redirige a `/movies`
- `/movies`: listado con total y calificación promedio
- `/movies/:rank`: detalle de una película
- `/favorites`: películas marcadas como favoritas

## Ejecutar localmente

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev        # http://localhost:3000
```

Build de producción:

```bash
npm run build
npm run preview
```

## Tecnologías

Nuxt 4, `@nuxt/content` (con `better-sqlite3`), Pinia (`@pinia/nuxt`) y Skeleton CSS por CDN. La estructura sigue los tutoriales 5 (datasets con Nuxt Content) y 7 (Pinia) del curso.
