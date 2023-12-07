<template>
  <h1 class="text-xl">Detalhes de {{ buyer?.name }}</h1>
  <UCard>
    <h1 class="mb-4">Dados</h1>
    <UForm
      :state="state"
      :schema="buyerSchema"
      @submit="onSubmit"
      class="flex flex-col gap-2"
    >
      <div class="flex gap-2">
        <UFormGroup label="Nome" name="name" class="flex-1">
          <UInput v-model="state.name" />
        </UFormGroup>
        <UFormGroup label="Documento" name="document" class="flex-1">
          <UInput v-model="state.document" />
        </UFormGroup>
      </div>
      <div class="flex gap-2">
        <UFormGroup label="E-mail" name="email" class="flex-1">
          <UInput v-model="state.email" type="email" />
        </UFormGroup>
        <UFormGroup label="Senha" name="password" class="flex-1">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>
      </div>
      <div class="flex justify-end gap-2 mt-2">
        <UButton variant="ghost" @click="routeBack">Cancelar</UButton>
        <UButton variant="soft" type="submit">Salvar</UButton>
      </div>
    </UForm>
  </UCard>
  <UCard>
    <UTable :rows="rows!" />
    <!-- <h1 class="mb-4">Ingressos</h1>
    <div class="flex flex-col gap-2">
      <div class="flex">
        <div class="w-16 h-24">
          <USkeleton class="h-full w-full" />
        </div>
        <div class="flex flex-col px-2 gap-2">
          <p>A origem</p>
          <p>20:00 24/11/2020</p>
          <UBadge class="w-fit">Dublado</UBadge>
        </div>
        <div class="ml-auto self-center">
          <UButton icon="i-heroicons-pencil-square" variant="soft" />
          <UButton
            icon="i-heroicons-trash"
            color="red"
            variant="soft"
            class="ml-2"
          />
        </div>
      </div>
    </div> -->
  </UCard>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import dayjs from "dayjs";
import { object, string, type InferType } from "yup";

const buyerId = useRoute().params.id;
const router = useRouter();
const { data: buyer } = await useFetch<BuyerDetails>(
  `http://localhost:3000/buyers/${buyerId}`
);

const toast = useToast();
const isCreating = ref(false);

const rows = computed(() => {
  if (!buyer?.value) return [];

  return buyer.value.tickets.map((ticket) => ({
    id: ticket.ID,
    assento: ticket.seat,
    modalidade: ticket.modality,
    horário: dayjs(ticket.session.time).format("DD/MMM HH:mm"),
  }));
});

const toggleIsEditing = () => {
  isCreating.value = !isCreating.value;
};

const routeBack = () => {
  router.back();
};

const state: Buyer = reactive({
  name: buyer.value?.name,
  document: buyer.value?.document,
  email: buyer.value?.email,
  password: buyer.value?.password,
});

const buyerSchema = object({
  name: string().required("Informe do nome"),
  document: string().required("Informe o documento"),
  email: string().required("Informe o e-mail").email("Email inválido"),
  password: string()
    .required("Informe a senha")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type Schema = InferType<typeof buyerSchema>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toggleIsEditing();

  const { status } = await useFetch(`http://localhost:3000/buyers/${buyerId}`, {
    server: false,
    method: "put",
    body: event.data,
  });

  toggleIsEditing();

  if (status.value === "success") {
    router.push("/customer");
    toast.add({ title: "Cliente editado com sucesso!" });
  }

  if (status.value === "error") {
    toast.add({ title: "Erro ao editar cliente", color: "red" });
  }
}
</script>
