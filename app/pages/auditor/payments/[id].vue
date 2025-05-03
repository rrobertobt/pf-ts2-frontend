<template>
  <div class="w-full">
    <h4 class="text-xl my-2 font-semibold text-muted-color-emphasis">
      Detalle y registro de pago
    </h4>
    <Button label="Imprimir" size="small" icon="pi pi-print" class="mb-4 print:hidden!" severity="secondary" variant="text" @click="handlePrint" />
    <Card v-if="data" class="w-full">
      <template #content>
        <div class="flex flex-col gap-2">
          <p class="text-sm">
            <span class="font-semibold text-muted-color">Código de boleta:</span>
            <span class="ml-2 text-xl">{{ data?.correlative }}</span>
          </p>
          <p class="text-sm">
            <span class="font-semibold text-muted-color">Fecha de generación:</span>
            <span class="ml-2 text-xl">
              {{ data?.created_at ?
                dateFormatter.format(new Date(data?.created_at)) :
                "-"
              }}
            </span>
          </p>
          <p class="text-sm">
            <span class="font-semibold text-muted-color">Cantidad a pagar:</span>
            <span class="ml-2 text-xl">
              {{ data?.amount ? `Q.${data?.amount}` : "-" }}
            </span>
          </p>
          <p class="text-sm">
            <span class="font-semibold text-muted-color">Pagada: </span>
            <span class="ml-2 text-xl">
              {{ data?.paid ? "Sí" : "No" }}
            </span>
          </p>
          <p class="text-sm" v-if="data?.paid">
            <span class="font-semibold text-muted-color">Fecha de pago:</span>
            <span class="ml-2 text-xl">
              {{ data?.payment_date ?
                dateFormatter.format(new Date(data?.payment_date)) :
                "-"
              }}
            </span>
          </p>
        </div>
        <h3 class="text-xl my-2 font-semibold">
          Más información
        </h3>
        <div class="mt-2">
          <p class="text-sm">
            <span class="font-semibold text-muted-color">Nicho:</span>
          </p>
          <p class="text-sm">
            <span class=" text-xl">
              {{ data?.contract?.niche?.code ? data?.contract.niche.code : "-" }}
            </span>
          </p>
          <p class="text-sm">
            <span class="font-semibold text-muted-color">Nombre del difunto:</span>
          </p>
          <p class="text-sm">
            <span class=" text-xl">
              {{ data?.contract?.occupant?.first_name ? data?.contract.occupant.first_name : "-" }}
              {{ data?.contract?.occupant?.last_name ? data?.contract.occupant.last_name : "-" }}
            </span>
          </p>
          <p class="text-sm">
            <span class="font-semibold text-muted-color">Nombre del responsable:</span>
          </p>
          <p class="text-sm">
            <span class=" text-xl">
              {{ data?.contract?.representative?.first_name ? data?.contract.representative.first_name : "-" }}
              {{ data?.contract?.representative?.last_name ? data?.contract.representative.last_name : "-" }}
            </span>
          </p>
        </div>

        <section class="mt-4" v-if="data?.evidence_url">
          <h3 class="text-xl font-semibold">
            Comprobante de pago
          </h3>
          <Button variant="text" size="small" severity="warn" icon="pi pi-eye" label="Ver imagen original"
            :as="NuxtLink" :to="data?.evidence_url" target="_blank" class="mt-2" />
          <img class="mt-4 aspect-square object-cover mx-auto w-1/3 rounded-lg shadow-md" :src="data?.evidence_url"
            alt="evidence" />
        </section>
      </template>
    </Card>

  </div>
</template>
<script setup>
import { NuxtLink } from '#components';
import { getPaymentById } from '~/lib/api/payments';

const toast = useToastService();
const route = useRoute();
const { data, status, refresh } = await useAsyncData(() =>
  getPaymentById(route.params.id),
);

const dateFormatter = new Intl.DateTimeFormat("es-GT", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const handlePrint = () => {
  window.print();
}
definePageMeta({
  layout: "auditor",
});
</script>
<style scoped></style>