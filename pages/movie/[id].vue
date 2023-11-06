<template>
  <div class="flex flex-col max-w-5xl mx-auto justify-center gap-4">
    <h1 class="text-xl">{{ movie.nome }}</h1>
    <p>{{ movie.sinopse }}</p>

    <UTabs :items="items">
      <template #item="{ item }">
        <UCard>
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-4">
              <UBadge size="md" class="w-fit">Dublado</UBadge>
              <div class="flex flex-row gap-2">
                <UButton
                  size="xl"
                  variant="outline"
                  v-for="time in item.times.dubbed"
                  >{{ time }}</UButton
                >
              </div>
            </div>
            <UDivider />
            <div class="flex flex-col gap-4">
              <UBadge size="md" class="w-fit">Legendado</UBadge>
              <div class="flex flex-row gap-2">
                <UButton
                  size="xl"
                  variant="outline"
                  v-for="time in item.times.subtitled"
                  >{{ time }}</UButton
                >
              </div>
            </div>
          </div>
        </UCard>
      </template>
    </UTabs>
  </div>
</template>

<script setup>
import movies from "../mock/movies.json";
const route = useRoute();
const movie = movies.find((movie) => movie.id == route.params.id);
const times = {
  dubbed: ["14:30", "19:00", "21:40"],
  subtitled: ["15:30", "17:00", "20:20", "22:40"],
};

const items = [
  {
    label: "Hoje",
    times,
    content: "etestsetse",
  },
  {
    label: "06/11",
    content: "1",
  },
  {
    label: "07/11",
    content: "as",
  },
  {
    label: "08/11",
    content: "sadsad",
  },
];
</script>
