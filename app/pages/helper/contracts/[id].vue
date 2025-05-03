<template>
  <div class="w-full pb-24">
    <h4 class="text-xl my-2 font-semibold text-muted-color-emphasis">
      Detalle del contrato
    </h4>

    <Button class="my-4" size="small" :as="NuxtLink" to="/admin/contracts-payments" label="Regresar">
      <template #icon>
        <Icon name="lucide:arrow-left" />
      </template>
    </Button>

    <div v-if="data">
      <div class="grid grid-cols-3 gap-4">
        <div class="text-lg">
          <span class="font-medium flex items-center text-muted-color">
            <Icon name="tabler:grave" class="mr-2 inline-block" />
            Información de nicho:
          </span>
          <div class="my-3">
            <p class="">
              <span class="font-semibold text-muted-color">Código único:</span>
              <span class="ml-2 text-xl">{{ data?.niche?.code }}</span>
            </p>
            <p class="">
              <span class="font-semibold text-muted-color">Calle y avenida:</span>
              <span class="ml-2 text-xl">
                {{ data?.niche?.street_location }} y
                {{ data?.niche?.avenue_location }}
              </span>
            </p>
          </div>
        </div>
        <div class="text-lg">
          <span class="font-medium flex items-center text-muted-color">
            <Icon name="lucide:user-x" class="mr-2 inline-block" />
            Información de ocupante:
          </span>
          <div class="my-3">
            <p class="">
              <span class="font-semibold text-muted-color">DPI:</span>
              <span class="ml-2 text-xl">{{ data?.occupant?.dpi }}</span>
            </p>
            <p class="">
              <span class="font-semibold text-muted-color">Nombre:</span>
              <span class="ml-2 text-xl">
                {{ data?.occupant?.first_name }}
                {{ data?.occupant?.last_name }}
              </span>
            </p>
            <p class="">
              <span class="font-semibold text-muted-color">Género:</span>
              <span class="ml-2 text-xl">
                {{ data?.occupant?.gender.name }}
              </span>
            </p>
            <p class="">
              <span class="font-semibold text-muted-color">Fecha de nacimiento:</span>
              <span class="ml-2 text-xl">
                {{ data?.occupant?.date_of_birth ?
                  dateFormatter.format(new Date(data?.occupant?.date_of_birth)) :
                  "-"
                }}
              </span>
            </p>
            <p class="">
              <span class="font-semibold text-muted-color">Fecha de defunción:</span>
              <span class="ml-2 text-xl">
                {{ data?.occupant?.death_date ?
                  dateFormatter.format(new Date(data?.occupant?.death_date)) :
                  "-"
                }}
              </span>
            </p>
            <p class="">
              <span class="font-semibold text-muted-color">Lugar de nacimiento:</span>
              <span class="ml-2 text-xl">
                {{ data?.occupant?.birth_location || "-" }}
              </span>
            </p>
            <p class="">
              <span class="font-semibold text-muted-color">Lugar de defunción:</span>
              <span class="ml-2 text-xl">
                {{ data?.occupant?.death_location || "-" }}
              </span>
            </p>

          </div>
        </div>
        <div class="text-lg">
          <span class="font-medium flex items-center text-muted-color">
            <Icon name="lucide:user-check" class="mr-2 inline-block" />

            Información de responsable:
          </span>
          <div class="my-3">
            <p class="">
              <span class="font-semibold text-muted-color">DPI:</span>
              <span class="ml-2 text-xl">{{ data?.representative?.dpi }}</span>
            </p>
            <p class="">
              <span class="font-semibold text-muted-color">Nombre:</span>
              <span class="ml-2 text-xl">
                {{ data?.representative?.first_name }}
                {{ data?.representative?.last_name }}
              </span>
            </p>
            <p class="">
              <span class="font-semibold text-muted-color">Teléfono:</span>
              <span class="ml-2 text-xl">{{ data?.representative?.phone || "-" }}</span>
            </p>
            <p class="">
              <span class="font-semibold text-muted-color">Dirección:</span>
              <span class="ml-2 text-xl">
                {{ data?.representative?.address || "-" }}
              </span>
            </p>
            <p class="">
              <span class="font-semibold text-muted-color">Email:</span>
              <span class="ml-2 text-xl">{{ data?.representative?.email }}</span>
            </p>

          </div>
        </div>


      </div>
      <h4 class="text-xl my-2 font-semibold text-muted-color-emphasis">
        Estado del contrato
      </h4>

      <div class="grid grid-cols-3 gap-4">
        <div class="text-lg">
          <span class="font-medium flex items-center text-muted-color">
            <Icon name="lucide:calendar" class="mr-2 inline-block" />
            Fecha de inicio:
          </span>
          <div class="my-3">
            <p class="">
              <span class=" text-xl">
                {{ data?.start_date ?
                  dateFormatter.format(new Date(data?.start_date)) :
                  "-"
                }}
              </span>
            </p>
          </div>
        </div>
        <div class="text-lg">
          <span class="font-medium flex items-center text-muted-color">
            <Icon name="lucide:calendar" class="mr-2 inline-block" />
            Fecha de vencimiento:
          </span>
          <div class="my-3">
            <p class="">
              <span class=" text-xl">
                {{ data?.end_date ?
                  dateFormatter.format(new Date(data?.end_date)) :
                  "-"
                }}
              </span>
            </p>
          </div>
        </div>
        <div class="text-lg">
          <span class="font-medium flex items-center text-muted-color">
            <Icon name="lucide:check-circle" class="mr-2 inline-block" />
            Estado:
          </span>
          <div class="my-3">
            <p class="">
              <span class="font-semibold text-muted-color">Estado:</span>
              <span class="ml-2 text-xl">
                {{ data?.state.name }}
              </span>
              <span class="ml-2 text-lg block">
                {{ data?.state.description }}
              </span>
            </p>
          </div>
        </div>
      </div>

      <h4 class="text-xl my-2 font-semibold text-muted-color-emphasis">
        Pagos
      </h4>

      <Button label="Crear boleta de pago" icon="pi pi-plus" @click="handleCreatePayment"
        :loading="paymentLoading === 'pending'" />

      <h4 class="my-2 font-semibold text-muted-color">
        Boleta activa
      </h4>
      <div>
        <!-- {{ data?.current_payment ? data?.current_payment : "No hay boleta activa" }} -->
        <Card v-if="data?.current_payment" class="w-full">
          <template #content>
            <div class="flex flex-col gap-2">
              <p class="text-sm">
                <span class="font-semibold text-muted-color">Código de boleta:</span>
                <span class="ml-2 text-xl">{{ data?.current_payment?.correlative }}</span>
              </p>
              <p class="text-sm">
                <span class="font-semibold text-muted-color">Fecha de generación:</span>
                <span class="ml-2 text-xl">
                  {{ data?.current_payment?.created_at ?
                    dateFormatter.format(new Date(data?.current_payment?.created_at)) :
                    "-"
                  }}
                </span>
              </p>
              <p class="text-sm">
                <span class="font-semibold text-muted-color">Cantidad a pagar:</span>
                <span class="ml-2 text-xl">
                  {{ data?.current_payment?.amount ? `Q.${data?.current_payment?.amount}` : "-" }}
                </span>
              </p>
              <p class="text-sm">
                <span class="font-semibold text-muted-color">Pagada: </span>
                <span class="ml-2 text-xl">
                  {{ data?.current_payment?.paid ? "Sí" : "No" }}
                </span>
              </p>

            </div>
            <Button variant="text" size="small" severity="info" icon="pi pi-check" label="Registrar pago" :as="NuxtLink"
              :to="`/admin/payments/${data?.current_payment?.id}`" />
          </template>
        </Card>
      </div>
      <h4 class="my-2 font-semibold text-muted-color">
        Otras boletas
      </h4>
      <div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4" v-if="data?.payments?.length">
          <Card v-for="payment in data.payments" :key="payment.id">
            <template #content>
              <p class="font-semibold text-muted-color">Boleta:</p>
              <p>{{ payment.correlative }}</p>
              <p class="font-semibold text-muted-color">Fecha:</p>
              <p>{{ payment.created_at ? dateFormatter.format(new Date(payment.created_at)) : "-" }}</p>
              <p class="font-semibold text-muted-color">Monto:</p>
              <p>{{ payment.amount ? `$${payment.amount}` : "-" }}</p>
              <p class="font-semibold text-muted-color">Pagada:</p>
              <p>{{ payment.paid ? "Sí" : "No" }}</p>
              <Button variant="text" size="small" severity="warn" icon="pi pi-eye" label="Ver detalles" :as="NuxtLink"
                :to="`/helper/payments/${payment.id}`" />
            </template>
          </Card>
        </div>
        <p v-else>No hay otras boletas</p>
      </div>

    </div>
    <div v-else-if="status === 'pending'">
      <p class="text-lg">Cargando...</p>
    </div>
    <div v-else-if="status === 'error'">
      <p class="text-lg">No se ha encontrado este contrato</p>
    </div>
  </div>
</template>
<script setup>
import { NuxtLink } from "#components";
import { createPayment, getContractById, updateContract } from "~/lib/api/contracts";

const route = useRoute();
const toast = useToastService();
const { data, status, refresh } = await useAsyncData(() =>
  getContractById(route.params.id),
);

const dateFormatter = new Intl.DateTimeFormat("es-GT", {
  year: "numeric",
  month: "long",
  day: "numeric",
});



const { mutate: handleCreatePayment, asyncStatus: paymentLoading } = useMutation({
  mutation: () => createPayment(route.params.id),
  onSuccess: () => {
    toast.add({
      severity: "success",
      summary: "Éxito",
      detail: "Pago creado correctamente",
    });
    refresh();
  },
  onError: (error) => {
    toast.add({
      severity: "error",
      summary: "Error al crear el pago",
      detail: error.data?.message || "Error al crear el pago",
    });
  },
})
// const handleCreatePayment = async () => {
//   await createPayment(route.params.id);
//   await refresh();
// }


const handleApprove = async () => {
  await updateContract(route.params.id, {
    action: "approve"
  });
  await refresh();
}

const handleReject = async () => {
  await updateContract(route.params.id, {
    action: "reject"
  });
  await refresh();
}




definePageMeta({
  layout: "helper",
});
</script>
<style scoped></style>
