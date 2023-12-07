<template>
  <h1 class="text-xl">Clientes</h1>
  <UCard>
    <UTable :rows="buyers!" :columns="columns" @select="select" />
  </UCard>
</template>

<script setup lang="ts">
const { data: buyers } = await useFetch<Buyer[]>(
  `http://localhost:3000/buyers`,
  { watch: [] }
);

const router = useRouter();

const columns = [
  {
    key: "ID",
    label: "Id",
  },
  {
    key: "name",
    label: "Nome",
  },
  {
    key: "document",
    label: "Documento",
  },
];

function select(row: any) {
  router.push(`/customer/${row.ID}`);
}
</script>
