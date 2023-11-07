<template>
  <div class="flex gap-8">
    <h1 class="text-xl">Filmes</h1>
    <UButton icon="i-heroicons-plus" square />
  </div>
  <div class="flex flex-row gap-4 flex-wrap">
    <div v-for="movie in movies" :key="movie.id">
      <MovieCard :movie="movie" />
    </div>
  </div>
</template>

<script setup>
import movies from "../mock/movies.json";
</script>
