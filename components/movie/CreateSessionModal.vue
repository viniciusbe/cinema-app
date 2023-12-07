<template>
  <UCard
    :ui="{
      ring: '',
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
    }"
  >
    <template #header>
      <h1>Adicionar Sessão</h1>
    </template>

    <UForm
      :schema="sessionSchema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup label="Data" name="time">
        <VueDatePicker
          model-type="yyyy-MM-dd'T'HH:mm:ssXXX"
          v-model="state.time"
          time-picker-inline
          :teleport="true"
          minutes-increment="5"
          format="dd/LLL HH:mm"
          dark
        />
      </UFormGroup>

      <UFormGroup label="Linguagem" name="language">
        <USelect v-model="state.language" :options="languages" />
      </UFormGroup>

      <UFormGroup label="Sala" name="room">
        <UInput v-model.number="state.room" type="number" />
      </UFormGroup>

      <UFormGroup name="filmId" hidden>
        <UInput v-model.number="state.filmId" type="number" />
      </UFormGroup>

      <div class="flex flex-row justify-end gap-2">
        <UButton @click="toggleModal"> Cancelar </UButton>
        <UButton type="submit" :loading="isCreating"> Salvar </UButton>
      </div>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import dayjs from "dayjs";
import { number, object, string, type InferType } from "yup";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const id = useRoute().params.id;
const { toggleModal, successCallback } = defineProps([
  "toggleModal",
  "successCallback",
]);

const isCreating = ref(false);
const toast = useToast();

const toggleIsCreating = () => {
  isCreating.value = !isCreating.value;
};

const languages: Language[] = ["Dublado", "Legendado"];

const state: Session = reactive({
  time: dayjs().startOf("hour").add(1, "hour").format(),
  language: languages[0],
  filmId: parseInt(id as string),
  room: undefined,
});

const sessionSchema = object({
  time: string().required("Informe a data e hora do filme"),
  language: string().required(""),
  room: number()
    .required("Informe a sala que irá passar o filme")
    .positive("Duração não pode ser menos que 0"),
  filmId: number().required(""),
});

type Schema = InferType<typeof sessionSchema>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toggleIsCreating();
  console.log(event.data);

  const { status } = await useFetch("http://localhost:3000/sessions", {
    server: false,
    method: "post",
    body: event.data,
  });

  toggleIsCreating();

  if (status.value === "success") {
    successCallback();
    toast.add({ title: "Sessão criada com sucesso!" });
  }

  if (status.value === "error") {
    toast.add({ title: "Erro ao criar sessão", color: "red" });
  }
}
</script>
