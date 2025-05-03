<template>
  <div class="!w-full">
    <h4 class="text-xl my-2 font-semibold text-muted-color-emphasis">
      Mis contratos
    </h4>

    <div v-if="data" class="grid gap-4 grid-cols-2 lg:grid-cols-3 mb-4">
      <Card v-for="(contract, index) in data">
        <template #content>
          <p>
            <span>Código de nicho: </span>
            <span class="font-semibold">{{ contract.niche.code }}</span>
          </p>
          <p>
            <span>Estado: </span>
            <span class="font-semibold">
              {{ contract.state.name }}
            </span>
          </p>
          <p>
            <span>Fecha de inicio: </span>
            <span class="font-semibold">
              {{ contract.start_date }}
            </span>
          </p>
          <p>
            <span>Fecha de fin: </span>
            <span class="font-semibold">
              {{ contract.end_date }}
            </span>
          </p>
          <p>
            <span>Nombre del difunto: </span>
            <span class="font-semibold">
              {{ contract.occupant.first_name }} {{ contract.occupant.last_name }}
            </span>
          </p>
        </template>
      </Card>
    </div>
  </div>
</template>
<script setup>
const { data } = useAsyncData(() => $api('/me/contracts'))

definePageMeta({
  layout: "regular",
});
</script>
<style scoped></style>