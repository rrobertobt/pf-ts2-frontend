<template>
  <div class="w-full pb-24">
    <h4 class="text-2xl my-2 font-semibold text-muted-color-emphasis">
      Reportes
    </h4>

    <Button label="Imprimir" size="small" icon="pi pi-print" class="mb-4 print:hidden!" severity="secondary"
      variant="text" @click="handlePrint" />

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

    <h4 class="text-xl my-2 font-semibold text-muted-color-emphasis">
      Reporte de ocupantes
    </h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <Chart type="bar" :data="genderChartData" />
        <Chart type="bar" :data="ageChartData" />
      </div>
  </div>
</template>
<script setup>
const { data: nichesData } = await useAsyncData(() => $api('/reports/niches'));
const { data: occupantsData } = await useAsyncData(() => $api('/reports/occupants'));

const handlePrint = () => {
  window.print();
}

onMounted(() => {
  genderChartData.value = setGenderChartData();
  ageChartData.value = setAgeChartData();
});
const genderChartData = ref();
const ageChartData = ref();
const setGenderChartData = () => {
  return {
    labels: occupantsData.value?.data?.gender.map(item => item.name),
    datasets: [
      {
        label: 'Género',
        data: occupantsData.value?.data?.gender.map(item => item.total),
        backgroundColor: ['rgba(249, 115, 22, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(139, 92, 246 0.2)'],
        borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
        borderWidth: 1
      }
    ]
  };
};
const setAgeChartData = () => {
  return {
    labels: occupantsData.value?.data?.age.map(item => item.rango_edad),
    datasets: [
      {
        label: 'Edad',
        data: occupantsData.value?.data?.age.map(item => item.total),
        borderWidth: 1
      }
    ]
  };
};

definePageMeta({
  layout: "helper",
});
</script>
<style scoped></style>