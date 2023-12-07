<template>
  <div class="flex justify-between p-8">
    <NuxtLink to="/"> <h1 class="text-xl">Ingressos</h1></NuxtLink>
    <div class="flex flex-row gap-2">
      <UButton variant="soft">Entrar</UButton>
      <UButton variant="ghost">Cadastrar</UButton>
      <UButton variant="ghost" to="/customer">Clientes</UButton>
    </div>
  </div>
  <UDivider class="mb-8" />
  <div class="flex flex-col max-w-5xl mx-auto justify-center gap-4">
    <NuxtPage />
  </div>
</template>
