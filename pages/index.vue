<template>
  <div class="flex gap-8">
    <h1 class="text-xl">Filmes</h1>
    <UButton icon="i-heroicons-plus" square @click="isOpen = true" />
  </div>
  <div class="flex flex-row gap-4 flex-wrap">
    <div v-for="movie in movies" :key="movie.id">
      <MovieCard :movie="movie" />
    </div>
  </div>

  <UModal v-model="isOpen">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <h1>Adicionar Filme</h1>
      </template>

      <UForm
        :validate="validate"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Nome" name="name">
          <UInput v-model="state.name" />
        </UFormGroup>

        <UFormGroup label="Duração em minutos" name="duration">
          <UInput v-model="state.duration" type="number" />
        </UFormGroup>

        <UFormGroup label="Sinopse" name="synopsis">
          <UInput v-model="state.synopsis" />
        </UFormGroup>

        <UFormGroup label="Classificação indicativa" name="age">
          <UInput v-model="state.age" type="number" />
        </UFormGroup>

        <UFormGroup label="Diretor" name="director">
          <USelectMenu
            v-model="state.director"
            :options="options.directors"
            option-attribute="name"
          />
        </UFormGroup>

        <UFormGroup label="Gêneros" name="genders">
          <USelectMenu
            v-model="state.genders"
            :options="options.genders"
            option-attribute="description"
            multiple
          />
        </UFormGroup>

        <div class="flex flex-row justify-end gap-2">
          <UButton @click="isOpen = false"> Cancelar </UButton>
          <UButton type="submit" :loading="isCreating"> Salvar </UButton>
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>

<script setup>
const { data: movies } = await useFetch("http://localhost:3000/films", {
  server: false,
});
const { data: options } = await useFetch(
  "http://localhost:3000/films/options",
  { server: false }
);

const isCreating = ref(false);

const toggleIsCreating = () => {
  isCreating.value = !isCreating.value;
};

console.log(options);
const isOpen = ref(false);

const state = reactive({
  name: undefined,
  duration: undefined,
  synopsis: undefined,
  age: undefined,
  director: undefined,
  genders: [],
});

const validate = (state) => {
  const errors = [];
  // if (!state.name) errors.push({ path: "name", message: "Required" });
  // if (!state.duration) errors.push({ path: "duration", message: "Required" });
  // if (!state.synopsis) errors.push({ path: "synopsis", message: "Required" });
  // if (!state.age) errors.push({ path: "age", message: "Required" });
  // if (!state.director) errors.push({ path: "director", message: "Required" });

  // if (state.genders.length === 0)
  //   errors.push({ path: "genders", message: "Informe ao menos um gênero" });

  return errors;
};

async function onSubmit(event) {
  toggleIsCreating();

  const { data: newFilm, status } = await useFetch(
    "http://localhost:3000/films",
    {
      server: false,
      method: "post",
      body: event.data,
    }
  );

  toggleIsCreating();

  if (status.value === "success") {
    isOpen.value = false;
  }

  if (status.value === "error") {
  }
}
</script>
