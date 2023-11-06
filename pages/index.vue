<template>
  <div class="flex flex-col max-w-5xl mx-auto justify-center gap-4">
    <div>
      <h1>Filmes</h1>
    </div>
    <div class="flex flex-row gap-4 flex-wrap">
      <div v-for="movie in movies" :key="movie.id">
        <MovieCard :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script setup>
import movies from "../mock/movies.json";
</script>
