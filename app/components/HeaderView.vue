<!-- app/components/HeaderView.vue -->
<script setup lang="ts">
const store = useMoviesStore()
</script>

<template>
  <div class="row" style="margin-top: 15px">
    <NuxtLink class="button" to="/movies">Películas</NuxtLink>
    <NuxtLink class="button" to="/favorites">Favoritos ({{ store.favorites.length }})</NuxtLink>
  </div>
</template>
