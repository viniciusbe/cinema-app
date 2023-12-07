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
        :schema="movieSchema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Nome" name="name">
          <UInput v-model="state.name" />
        </UFormGroup>

        <UFormGroup label="URL do poster" name="poster">
          <UInput v-model="state.poster" />
        </UFormGroup>

        <UFormGroup label="Sinopse" name="synopsis">
          <UInput v-model="state.synopsis" />
        </UFormGroup>

        <UFormGroup label="Duração em minutos" name="duration">
          <UInput v-model.number="state.duration" type="number" />
        </UFormGroup>

        <UFormGroup label="Classificação indicativa" name="age">
          <UInput v-model.number="state.age" type="number" />
        </UFormGroup>

        <UFormGroup label="Diretor" name="director">
          <USelectMenu
            v-model="state.director"
            :options="options?.directors || []"
            option-attribute="name"
            :loading="pending"
          />
        </UFormGroup>

        <UFormGroup label="Gêneros" name="genders">
          <USelectMenu
            v-model="state.genders"
            :options="options?.genders || []"
            option-attribute="description"
            multiple
            :loading="pending"
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

<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { array, number, object, string, type InferType } from "yup";

const { data: movies } = await useFetch<Movie[]>("http://localhost:3000/films");
const { data: options, pending } = await useFetch<MovieOptions>(
  "http://localhost:3000/films/options",
  { server: false }
);

const toast = useToast();
const isOpen = ref(false);
const isCreating = ref(false);

const toggleIsCreating = () => {
  isCreating.value = !isCreating.value;
};

const state: Movie = reactive({
  name: "",
  poster: "",
  duration: undefined,
  synopsis: "",
  age: undefined,
  director: undefined,
  genders: [],
});

const gendersSchema = object({
  id: string(),
  description: string(),
});

const movieSchema = object({
  name: string().required("Informe do nome"),
  poster: string().required("Informe a URL do poster").url("URL inválida"),
  duration: number()
    .required("Informe a duração do filme")
    .positive("Duração não pode ser menos que 0"),
  synopsis: string().required("Informe a sinopse"),
  age: number().required("Informe a classificação").min(0).max(18),
  director: object().required("Selecione o diretor"),
  genders: array(gendersSchema).min(1, "Selecione ao menos um gênero"),
});

type Schema = InferType<typeof movieSchema>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toggleIsCreating();

  const { status } = await useFetch("http://localhost:3000/films", {
    server: false,
    method: "post",
    body: event.data,
  });

  toggleIsCreating();

  if (status.value === "success") {
    isOpen.value = false;
    toast.add({ title: "Filme criado com sucesso!" });
  }

  if (status.value === "error") {
    toast.add({ title: "Erro ao criar filme", color: "red" });
  }
}
</script>
