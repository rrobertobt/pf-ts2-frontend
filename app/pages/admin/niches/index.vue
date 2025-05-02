<template>
  <div class="w-full">
    <h4 class="text-xl my-2 font-semibold text-muted-color-emphasis">Nichos</h4>
    <Button
      class="!mb-4"
      :as="NuxtLink"
      to="/admin/niches/create"
      label="Registrar nicho"
      size="small"
    >
      <template #icon>
        <Icon name="lucide:plus" />
      </template>
    </Button>

    <!-- Filters -->
    <h4 class="my-2 font-semibold text-muted-color-emphasis">Filtros</h4>
    <div class="grid gap-4 grid-cols-2 lg:grid-cols-3 mb-4">
      <InputGroup>
        <InputGroupAddon>
          <Icon name="lucide:map-pin" />
        </InputGroupAddon>
        <InputText
          placeholder="Buscar por avenida"
          class="w-full"
          :default-value="$route.query.avenue_location"
          @input="
            (e) => {
              if (e.target.value)
                $router.push({
                  query: {
                    ...$route.query,
                    avenue_location: e.target.value,
                  },
                });
              else
                $router.push({
                  query: {
                    ...$route.query,
                    avenue_location: undefined,
                  },
                });
            }
          "
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <Icon name="lucide:map-pin" />
        </InputGroupAddon>
        <InputText
          placeholder="Buscar por calle"
          class="w-full"
          :default-value="$route.query.street_location"
          @input="
            (e) => {
              if (e.target.value)
                $router.push({
                  query: {
                    ...$route.query,
                    street_location: e.target.value,
                  },
                });
              else
                $router.push({
                  query: {
                    ...$route.query,
                    street_location: undefined,
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
          placeholder="Buscar por código único"
          class="w-full"
          :default-value="$route.query.code"
          @input="
            (e) => {
              if (e.target.value)
                $router.push({
                  query: {
                    ...$route.query,
                    code: e.target.value,
                  },
                });
              else
                $router.push({
                  query: {
                    ...$route.query,
                    code: undefined,
                  },
                });
            }
          "
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <Icon name="lucide:shapes" />
        </InputGroupAddon>
        <Select
          checkmark        
          :options="nicheTypes"
          option-label="name"
          option-value="id"
          placeholder="Buscar por tipo"
          :loading="nicheTypesLoading"
          fluid
          show-clear
          @change="
            (e) => {
              if (e.value)
                $router.push({
                  query: {
                    ...$route.query,
                    type_id: e.value,
                  },
                });
              else
                $router.push({
                  query: {
                    ...$route.query,
                    type_id: undefined,
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
          :options="nicheStates"
          option-label="name"
          option-value="id"
          placeholder="Buscar por estado"
          :loading="nicheStatesLoading"
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

    <!-- Data display -->
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
      <Column field="code" header="Código único"></Column>
      <Column field="avenue_location" header="Avenida"></Column>
      <Column field="avenue_location" header="Calle"></Column>
      <Column field="type" header="Tipo">
        <template #body="{ data }">
          <Tag :value="data.type.name" pt:label:class="text-xs" />
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
    </DataTable>
  </div>
</template>
<script setup>
  import { NuxtLink } from "#components";
  import {
    getAllNiches,
    getAllNicheStates,
    getAllNicheTypes,
  } from "~/lib/api/niches";

  const route = useRoute();

  // Data fetching for filters
  const { data: nicheTypes, loading: nicheTypesLoading } = await useAsyncData(
    () => getAllNicheTypes(),
    {
      lazy: true,
    },
  );
  const { data: nicheStates, loading: nicheStatesLoading } = await useAsyncData(
    () => getAllNicheStates(),
    {
      lazy: true,
    },
  );
  // Data fetching
  const limit = ref(5);
  const currentPage = computed(() => {
    return limit.value * (route.query.page ? Number(route.query.page) - 1 : 0);
  });
  const { data, refresh, status } = await useAsyncData(
    () =>
      getAllNiches({
        ...route.query,
        per_page: limit.value,
      }),
    {
      watch: [() => route.query],
    },
  );

  const getStateColor = (state) => {
    switch (state) {
      case "ocupado":
        return "danger";
      case "disponible":
        return "success";
      default:
        return "warning";
    }
  };

  definePageMeta({
    layout: "admin",
  });
</script>
<style scoped></style>
