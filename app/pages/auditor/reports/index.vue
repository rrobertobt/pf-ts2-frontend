<template>
  <div class="w-full pb-24">
    <h4 class="text-2xl my-2 font-semibold text-muted-color-emphasis">
      Reportes
    </h4>

    <Button label="Imprimir" size="small" icon="pi pi-print" class="mb-4 print:hidden!" severity="secondary"
      variant="text" @click="handlePrint" />

    <h4 class="text-xl my-2 font-semibold text-muted-color-emphasis">
      Reporte de pagos
    </h4>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 px-2">
      <div
        class="bg-surface-100 dark:bg-surface-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
        <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
          <i class="pi pi-credit-card text-xl"></i>
        </div>
        <h3 class="text-xl font-semibold text-muted-color-emphasis">Pagos Totales</h3>
        <p class="text-3xl font-bold text-blue-600">{{ paymentsData?.data?.total_count }}</p>
      </div>

      <div
        class="bg-surface-100 dark:bg-surface-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
        <div class="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <i class="pi pi-check text-xl"></i>
        </div>
        <h3 class="text-xl font-semibold text-muted-color-emphasis">Pagados</h3>
        <p class="text-3xl font-bold text-green-600">{{ paymentsData?.data?.paid_count }}</p>
      </div>

      <div
        class="bg-surface-100 dark:bg-surface-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
        <div class="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
          <i class="pi pi-clock text-xl"></i>
        </div>
        <h3 class="text-xl font-semibold text-muted-color-emphasis">Pendientes</h3>
        <p class="text-3xl font-bold text-yellow-600">{{ paymentsData?.data?.pending_count }}</p>
      </div>

      <div
        class="bg-surface-100 dark:bg-surface-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
        <div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
          <i class="pi pi-dollar text-xl"></i>
        </div>
        <h3 class="text-xl font-semibold text-muted-color-emphasis">Total Recaudado</h3>
        <p class="text-3xl font-bold text-purple-600">Q {{ paymentsData?.data?.total_money.toFixed(2) }}</p>
      </div>
    </div>

    <h4 class="text-xl my-2 font-semibold text-muted-color-emphasis">
      Reporte de nichos
    </h4>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 px-2">
      <div
        class="bg-surface-100 dark:bg-surface-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-center ">
        <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
          <i class="pi pi-home text-xl"></i>
        </div>
        <h3 class="text-xl font-semibold text-muted-color-emphasis">Total de Nichos</h3>
        <p class="text-3xl font-bold text-blue-600">{{ nichesData?.data?.total_count }}</p>
      </div>

      <div
        class="bg-surface-100 dark:bg-surface-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-center ">
        <div class="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <i class="pi pi-check-circle text-xl"></i>
        </div>
        <h3 class="text-xl font-semibold text-muted-color-emphasis">Ocupados</h3>
        <p class="text-3xl font-bold text-green-600">{{ nichesData?.data?.occupied_count }}</p>
      </div>

      <div
        class="bg-surface-100 dark:bg-surface-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-center ">
        <div class="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
          <i class="pi pi-exclamation-circle text-xl"></i>
        </div>
        <h3 class="text-xl font-semibold text-muted-color-emphasis">Disponibles</h3>
        <p class="text-3xl font-bold text-yellow-600">{{ nichesData?.data?.available_count }}</p>
      </div>

      <div
        class="bg-surface-100 dark:bg-surface-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-center ">
        <div class="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
          <i class="pi pi-trash text-xl"></i>
        </div>
        <h3 class="text-xl font-semibold text-muted-color-emphasis">Exhumaciones</h3>
        <p class="text-3xl font-bold text-red-600">{{ nichesData?.data?.exhumation_count }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
const { data: paymentsData } = await useAsyncData(() => $api('/reports/payments'));
const { data: nichesData } = await useAsyncData(() => $api('/reports/niches'));

const handlePrint = () => {
  window.print();
}

definePageMeta({
  layout: "auditor",
});
</script>
<style scoped></style>