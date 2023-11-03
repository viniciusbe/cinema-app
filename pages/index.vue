<template>
  <div class="flex flex-row gap-4 flex-wrap max-w-5xl mx-auto justify-center">
    <div v-for="movie in movies" :key="movie.id">
      <MovieCard :movie="movie" />
    </div>
  </div>
</template>

<script setup>
import movies from "../mock/movies.json";
</script>
