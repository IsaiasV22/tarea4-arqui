<!-- app/pages/movies/index.vue -->
<script setup lang="ts">
const store = useMoviesStore()
const { movies, total, averageRating, isLoading, error } = storeToRefs(store)

await callOnce('movies-list', () => store.fetchMovies())
</script>

<template>
  <div class="container">
    <HeaderView />
    <h3 style="margin-top: 15px">IMDB Top 250 Movies ({{ total }})</h3>
    <p>Calificación promedio: <strong>{{ averageRating }}</strong></p>
    <p v-if="isLoading">Cargando…</p>
    <p v-else-if="error">Error: {{ error }}</p>
    <ul v-else>
      <li v-for="m in movies" :key="m.rank">
        #{{ m.rank }}
        <NuxtLink :to="`/movies/${m.rank}`">{{ m.name }}</NuxtLink>
        ({{ m.year }})
        <button @click="store.toggleFavorite(m.rank)">
          {{ store.favorites.includes(m.rank) ? '★' : '☆' }}
        </button>
      </li>
    </ul>
    <FooterView />
  </div>
</template>
