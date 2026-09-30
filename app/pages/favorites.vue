<!-- app/pages/favorites.vue -->
<script setup lang="ts">
const store = useMoviesStore()
await callOnce('movies-list', () => store.fetchMovies())
</script>

<template>
  <div class="container">
    <HeaderView />
    <h3 style="margin-top: 15px">Mis favoritos</h3>
    <p v-if="!store.favoriteMovies.length">Todavía no hay películas marcadas como favoritas.</p>
    <ul>
      <li v-for="m in store.favoriteMovies" :key="m.rank">
        #{{ m.rank }}
        <NuxtLink :to="`/movies/${m.rank}`">{{ m.name }}</NuxtLink>
        ({{ m.year }})
        <button @click="store.toggleFavorite(m.rank)">★</button>
      </li>
    </ul>
    <FooterView />
  </div>
</template>
