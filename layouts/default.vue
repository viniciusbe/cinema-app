<template>
  <div class="flex justify-between p-8">
    <h1 class="text-xl">Filmes</h1>
    <div class="flex flex-row gap-2">
      <UButton variant="soft" to="teste">Login</UButton>
      <UButton variant="ghost">Cadastro</UButton>
    </div>
  </div>
  <UDivider class="mb-8" />
  <NuxtPage />
</template>
