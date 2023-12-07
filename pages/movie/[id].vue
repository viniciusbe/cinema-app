<template>
  <h1 class="text-xl">{{ movieDetails?.name }}</h1>
  <p>{{ movieDetails?.synopsis }}</p>

  <UTabs :items="tabs">
    <template #item="{ item }">
      <UCard>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-4">
            <div class="flex justify-between">
              <UBadge size="md" class="w-fit">Dublado</UBadge>
              <UButton icon="i-heroicons-plus" square @click="toggleModal" />
            </div>
            <div class="flex flex-row gap-2">
              <UButton
                size="xl"
                variant="outline"
                v-for="time in item.times.dubbed"
              >
                {{ time }}
              </UButton>
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
              >
                {{ time }}
              </UButton>
            </div>
          </div>
        </div>
      </UCard>
    </template>
  </UTabs>

  <UModal v-model="isOpen">
    <CreateSessionModal
      :toggle-modal="toggleModal"
      :success-callback="creationSuccessCallback"
    />
  </UModal>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import CreateSessionModal from "~/components/movie/CreateSessionModal.vue";
const movieId = useRoute().params.id;
const tabs = ref(
  Array.from(new Array(4)).map((_, index) => ({
    label: index.toString(),
    times: { dubbed: [""], subtitled: [""] },
  }))
);

const isOpen = ref(false);
const creationTimestamp = ref(Date.now());

function toggleModal() {
  isOpen.value = !isOpen.value;
}

function creationSuccessCallback() {
  toggleModal();
  creationTimestamp.value = Date.now();
}

const { data: movieDetails } = await useFetch<MovieDetails>(
  `http://localhost:3000/films/${movieId}`,
  { watch: [creationTimestamp] }
);

const labels = ["Hoje", "Amanhã"];

watchEffect(() => {
  tabs.value = tabs.value.map((_, index) => {
    const date = dayjs().startOf("day").add(index, "day");
    const label = labels[index] || date.format("DD/MM");

    const sessions = movieDetails?.value?.sessions;
    const tabSessions = sessions?.filter((session) => {
      const sessionDate = dayjs(session.time).startOf("day");
      return date.isSame(sessionDate);
    });

    const dubbed = tabSessions
      ? tabSessions
          ?.filter((session) => session.language === "Dublado")
          .sort((firstSession, secondSession) =>
            dayjs(firstSession.time).diff(dayjs(secondSession.time))
          )
          .map(({ time }) => dayjs(time).format("HH:mm"))
      : [];
    const subtitled = tabSessions
      ? tabSessions
          ?.filter((session) => session.language === "Legendado")
          .sort((firstSession, secondSession) =>
            dayjs(firstSession.time).diff(dayjs(secondSession.time))
          )
          .map(({ time }) => dayjs(time).format("HH:mm"))
      : [];

    return {
      label,
      times: { dubbed, subtitled },
    };
  });
});
</script>
