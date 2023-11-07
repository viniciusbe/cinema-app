<template>
  <h1 class="text-xl">Clientes</h1>
  <UTable :rows="people" />
</template>

<script setup>
const people = [
  {
    id: 1,
    nome: "João",
    documento: "123456789",
    email: "joao@email.com",
  },
  {
    id: 2,
    nome: "Maria",
    documento: "987654321",
    email: "maria@email.com",
  },
  {
    id: 3,
    nome: "Pedro",
    documento: "456789123",
    email: "pedro@email.com",
  },
  {
    id: 4,
    nome: "Ana",
    documento: "654321987",
    email: "ana@email.com",
  },
  {
    id: 5,
    nome: "Lucas",
    documento: "789123456",
    email: "lucas@email.com",
  },
  {
    id: 6,
    nome: "Lara",
    documento: "321654789",
    email: "lara@email.com",
  },
];
</script>
