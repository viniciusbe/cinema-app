<template>
  <h1 class="text-xl">Cliente João</h1>
  <UCard>
    <h1 class="mb-4">Dados</h1>
    <UForm
      :state="state"
      :validate="validate"
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
        <UButton variant="ghost">Cancelar</UButton>
        <UButton variant="soft" type="submit">Salvar</UButton>
      </div>
    </UForm>
  </UCard>
  <UCard>
    <h1 class="mb-4">Ingressos</h1>
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
    </div>
  </UCard>
</template>

<script setup>
const state = reactive({
  name: undefined,
  document: undefined,
  email: undefined,
  password: undefined,
});

const validate = (state) => {
  const errors = [];
  if (!state.email)
    errors.push({ path: "email", message: "Campo obrigatório" });
  if (!state.password)
    errors.push({ path: "password", message: "Campo obrigatório" });
  return errors;
};

async function onSubmit(event) {
  // Do something with data
  console.log(event.data);
}
</script>
