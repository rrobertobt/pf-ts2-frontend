<template>
  <div class="w-full">
    <h4 class="text-xl my-2 font-semibold text-muted-color-emphasis">
      Contratos y pagos
    </h4>

    <!-- Filters -->
    <h4 class="my-2 font-semibold text-muted-color-emphasis">Filtros</h4>
    <div class="grid gap-4 grid-cols-2 lg:grid-cols-3 mb-4">
      <InputGroup>
        <InputGroupAddon>
          <Icon name="lucide:id-card" />
        </InputGroupAddon>
        <InputText
          placeholder="Buscar por DPI de ocupante"
          class="w-full"
          :default-value="$route.query.occupant_dpi"
          @input="
            (e) => {
              if (e.target.value)
                $router.push({
                  query: {
                    ...$route.query,
                    occupant_dpi: e.target.value,
                  },
                });
              else
                $router.push({
                  query: {
                    ...$route.query,
                    occupant_dpi: undefined,
                  },
                });
            }
          "
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <Icon name="lucide:id-card" />
        </InputGroupAddon>
        <InputText
          placeholder="Buscar por DPI de responsable"
          class="w-full"
          :default-value="$route.query.representative_dpi"
          @input="
            (e) => {
              if (e.target.value)
                $router.push({
                  query: {
                    ...$route.query,
                    representative_dpi: e.target.value,
                  },
                });
              else
                $router.push({
                  query: {
                    ...$route.query,
                    representative_dpi: undefined,
                  },
                });
            }
          "
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <Icon name="lucide:hash" />
        </InputGroupAddon>
        <InputText
          placeholder="Buscar por codigo de nicho"
          class="w-full"
          :default-value="$route.query.niche_code"
          @input="
            (e) => {
              if (e.target.value)
                $router.push({
                  query: {
                    ...$route.query,
                    niche_code: e.target.value,
                  },
                });
              else
                $router.push({
                  query: {
                    ...$route.query,
                    niche_code: undefined,
                  },
                });
            }
          "
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <Icon name="lucide:list-check" />
        </InputGroupAddon>
        <Select
          checkmark
          :options="contractStates"
          option-label="name"
          option-value="id"
          placeholder="Buscar por estado"
          :loading="contractStatesLoading"
          fluid
          show-clear
          @change="
            (e) => {
              if (e.value)
                $router.push({
                  query: {
                    ...$route.query,
                    state_id: e.value,
                  },
                });
              else
                $router.push({
                  query: {
                    ...$route.query,
                    state_id: undefined,
                  },
                });
            }
          "
        />
      </InputGroup>
    </div>
    <!-- Filters -->
    <DataTable
      :value="data.data"
      pt:tableContainer:class="shadow-md !rounded-lg"
      :rows="limit"
      :first="currentPage"
      :total-records="data?.total"
      :rows-per-page-options="[5, 10, 25, 50]"
      :loading="status === 'pending'"
      paginator
      lazy
      @page="
        ($event) =>
          $router.push({ query: { ...$route.query, page: $event.page + 1 } })
      "
      @update:rows="limit = $event"
    >
      <Column field="niche" header="Código de nicho">
        <template #body="{ data }">
          {{ data.niche.code }}
        </template>
      </Column>
      <Column field="state" header="Estado">
        <template #body="{ data }">
          <Tag
            :severity="getStateColor(data.state.slug)"
            :value="data.state.name"
            pt:label:class="text-xs"
          />
        </template>
      </Column>
      <Column field="occupant" header="Ocupante (DPI)">
        <template #body="{ data }">
          <span class="font-mono">{{ data.occupant.dpi }}</span>
        </template>
      </Column>
      <Column field="representative" header="Responsable (DPI)">
        <template #body="{ data }">
          <span class="font-mono">{{ data.representative.dpi }}</span>
        </template>
      </Column>
      <Column field="start_date" header="Fecha de inicio">
        <template #body="{ data }">
          {{ data.start_date }}
        </template>
      </Column>
      <Column field="end_date" header="Fecha de fin">
        <template #body="{ data }">
          {{ data.end_date }}
        </template>
      </Column>
      <Column field="actions" header="Acciones">
        <template #body="{ data }">
          <Button
            icon="pi pi-eye"
            size="small"
            label="Detalles"
            :as="NuxtLink"
            :to="`/auditor/contracts/${data.id}`"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup>
  import { NuxtLink } from "#components";
  import { getAllContracts, getAllContractStates } from "~/lib/api/contracts";

  const route = useRoute();

  // Data fetching for filters
  const { data: contractStates, loading: contractStatesLoading } =
    await useAsyncData(() => getAllContractStates(), {
      lazy: true,
    });

  // Data fetching
  const limit = ref(5);
  const currentPage = computed(() => {
    return limit.value * (route.query.page ? Number(route.query.page) - 1 : 0);
  });
  const { data, refresh, status } = await useAsyncData(
    () =>
      getAllContracts({
        ...route.query,
        per_page: limit.value,
      }),
    {
      watch: [() => route.query],
    },
  );
  const getStateColor = (state) => {
    switch (state) {
      case "pendiente":
        return "secondary";
      case "vigente":
        return "success";
      case "vencido":
        return "danger";
      case "rechazado":
        return "warning";
      default:
        return "info";
    }
  };
  definePageMeta({
    layout: "auditor",
  });
</script>
<style scoped></style>
