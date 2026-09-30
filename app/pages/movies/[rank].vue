<!-- app/pages/movies/[rank].vue -->
<script setup lang="ts">
const route = useRoute()
const store = useMoviesStore()
const { movie, prev, next } = storeToRefs(store)

const rank = Number(route.params.rank)
// mode 'navigation': al volver a un registro ya visitado (1 → 2 → 1) se vuelve a cargar,
// porque el store solo guarda el último registro consultado
await callOnce(`movie-${rank}`, () => store.fetchMovie(rank), { mode: 'navigation' })

if (!movie.value || movie.value.rank !== rank) {
  throw createError({ statusCode: 404, statusMessage: 'Película no encontrada', fatal: true })
}

// Los campos con varios valores vienen separados por comas sin espacio
const list = (value: string) => value.split(',').join(', ')
</script>

<template>
  <div class="container">
    <HeaderView />
    <div v-if="movie" class="row">
      <div class="eight columns">
        <h4 style="margin-top: 15px">#{{ movie.rank }} — {{ movie.name }}</h4>
        <p><em>{{ movie.tagline }}</em></p>
        <table class="u-full-width">
          <tbody>
            <tr><th>Posición</th><td>{{ movie.rank }}</td></tr>
            <tr><th>Título</th><td>{{ movie.name }}</td></tr>
            <tr><th>Año</th><td>{{ movie.year }}</td></tr>
            <tr><th>Calificación</th><td>{{ movie.rating }}</td></tr>
            <tr><th>Género</th><td>{{ list(movie.genre) }}</td></tr>
            <tr><th>Clasificación</th><td>{{ movie.certificate }}</td></tr>
            <tr><th>Duración</th><td>{{ movie.run_time }}</td></tr>
            <tr><th>Eslogan</th><td>{{ movie.tagline }}</td></tr>
            <tr><th>Presupuesto</th><td>{{ movie.budget }}</td></tr>
            <tr><th>Taquilla</th><td>{{ movie.box_office }}</td></tr>
            <tr><th>Reparto</th><td>{{ list(movie.casts) }}</td></tr>
            <tr><th>Dirección</th><td>{{ list(movie.directors) }}</td></tr>
            <tr><th>Guion</th><td>{{ list(movie.writers) }}</td></tr>
          </tbody>
        </table>
        <button @click="store.toggleFavorite(movie.rank)">
          {{ store.favorites.includes(movie.rank) ? '★ Quitar de favoritos' : '☆ Agregar a favoritos' }}
        </button>
      </div>
    </div>
    <div class="row">
      <NuxtLink v-if="prev" class="button" :to="`/movies/${prev.rank}`">← {{ prev.name }}</NuxtLink>
      <NuxtLink v-if="next" class="button" :to="`/movies/${next.rank}`">{{ next.name }} →</NuxtLink>
    </div>
    <FooterView />
  </div>
</template>
