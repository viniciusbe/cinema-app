<template>
  <div>
    <NuxtLink :to="`/movie/${movie.ID}`">
      <div
        class="h-80 w-56 flex-1 p-0 mb-2 p-0 overflow-hidden rounded relative"
      >
        <img :src="movie.poster" alt="" class="object-fit" />
        <UBadge class="absolute right-2 top-2">{{ movie.age }}</UBadge>
      </div>
    </NuxtLink>

    <div class="flex gap-1">
      <UBadge
        class="whitespace-nowrap"
        variant="outline"
        v-for="gender in genders"
      >
        {{ gender.description }}
      </UBadge>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["movie"]);
const movie = props.movie;
const genders = movie.genders;
</script>
