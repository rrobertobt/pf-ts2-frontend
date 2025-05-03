<template>
  <div class="w-full">
    <h4 class="text-xl my-2 font-semibold text-muted-color-emphasis">
      Ocupantes
    </h4>
    <Button
      class="!mb-4"
      :as="NuxtLink"
      to="/helper/occupants/create"
      label="Registrar ocupante"
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
          <Icon name="lucide:user" />
        </InputGroupAddon>
        <InputText
          placeholder="Buscar por nombre"
          class="w-full"
          :default-value="$route.query.first_name"
          @input="
            (e) => {
              if (e.target.value)
                $router.push({
                  query: {
                    ...$route.query,
                    first_name: e.target.value,
                  },
                });
              else
                $router.push({
                  query: {
                    ...$route.query,
                    first_name: undefined,
                  },
                });
            }
          "
        />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <Icon name="lucide:user" />
        </InputGroupAddon>
        <InputText
          placeholder="Buscar por apellido"
          class="w-full"
          :default-value="$route.query.last_name"
          @input="
            (e) => {
              if (e.target.value)
                $router.push({
                  query: {
                    ...$route.query,
                    last_name: e.target.value,
                  },
                });
              else
                $router.push({
                  query: {
                    ...$route.query,
                    last_name: undefined,
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
          placeholder="Buscar por DPI"
          class="w-full"
          :default-value="$route.query.dpi"
          @input="
            (e) => {
              if (e.target.value)
                $router.push({
                  query: {
                    ...$route.query,
                    dpi: e.target.value,
                  },
                });
              else
                $router.push({
                  query: {
                    ...$route.query,
                    dpi: undefined,
                  },
                });
            }
          "
        />
      </InputGroup>
      <!-- todo: by death date -->
      <InputGroup>
        <InputGroupAddon>
          <Icon name="lucide:list-check" />
        </InputGroupAddon>
        <Select
          checkmark
          :options="genders"
          option-label="name"
          option-value="id"
          placeholder="Buscar por género"
          :loading="gendersLoading"
          fluid
          show-clear
          @change="
            (e) => {
              if (e.value)
                $router.push({
                  query: {
                    ...$route.query,
                    gender_id: e.value,
                  },
                });
              else
                $router.push({
                  query: {
                    ...$route.query,
                    gender_id: undefined,
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

    <Column field="first_name" header="Nombre"></Column>
      <Column field="last_name" header="Apellido"></Column>
      <Column field="dpi" header="DPI">
        <template #body="{ data }">
          <span class="flex items-center gap-2">
            <Icon name="lucide:id-card" />
            {{ data.dpi || "N/A" }}
          </span>
        </template>
      </Column>
      <Column field="niche" header="Nicho actual">
        <template #body="{ data }">
          <span class="flex items-center gap-2">
            {{ data.current_niche.code }}
          </span>
        </template>
      </Column>
      <Column field="gender" header="Género">
        <template #body="{ data }">
          <Tag
            :value="data.gender.name"
            pt:label:class="text-xs font-normal"
            />
        </template>
      </Column>
      <!-- <Column field="code" header="Código único"></Column>
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
      </Column> -->
    </DataTable>
  </div>
</template>
<script setup>
  import { NuxtLink } from "#components";
  import { getAllGenders } from "~/lib/api/genders";
  import { getAllOccupants } from "~/lib/api/occupants";

  const route = useRoute();

  // Data fetching for filters
  const { data: genders, loading: gendersLoading } = await useAsyncData(
    () => getAllGenders(),
    {
      lazy: true,
    },
  );
  // const { data: nicheStates, loading: nicheStatesLoading } = await useAsyncData(
  //   () => getAllNicheStates(),
  //   {
  //     lazy: true,
  //   },
  // );
  // Data fetching
  const limit = ref(5);
  const currentPage = computed(() => {
    return limit.value * (route.query.page ? Number(route.query.page) - 1 : 0);
  });
  const { data, refresh, status } = await useAsyncData(
    () =>
      getAllOccupants({
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
    layout: "helper",
  });
</script>
<style scoped></style>
