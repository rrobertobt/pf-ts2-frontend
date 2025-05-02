<template>
  <div class="!w-full">
    <h4 class="text-xl my-2 font-semibold text-muted-color-emphasis">
      Usuarios
    </h4>
    <Button
      class="!mb-4"
      :as="NuxtLink"
      to="/admin/users/create"
      label="Crear usuario"
      size="small"
    >
      <template #icon>
        <Icon name="lucide:user-plus" />
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
          <Icon name="lucide:mail" />
        </InputGroupAddon>
        <InputText
          placeholder="Buscar por correo"
          class="w-full"
          :default-value="$route.query.email"
          @input="
            (e) => {
              if (e.target.value)
                $router.push({
                  query: {
                    ...$route.query,
                    email: e.target.value,
                  },
                });
              else
                $router.push({
                  query: {
                    ...$route.query,
                    email: undefined,
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
      <InputGroup>
        <InputGroupAddon>
          <Icon name="lucide:mail" />
        </InputGroupAddon>
        <InputText
          placeholder="Buscar por telefono"
          class="w-full"
          :default-value="$route.query.phone"
          @input="
            (e) => {
              if (e.target.value)
                $router.push({
                  query: {
                    ...$route.query,
                    phone: e.target.value,
                  },
                });
              else
                $router.push({
                  query: {
                    ...$route.query,
                    phone: undefined,
                  },
                });
            }
          "
        />
      </InputGroup>
    </div>

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
      <Column field="email" header="Correo">
        <template #body="{ data }">
          <span class="flex items-center gap-2">
            <Icon name="lucide:scan-face" />
            {{ data.email }}
          </span>
        </template>
      </Column>
      <Column field="first_name" header="Nombre"></Column>
      <Column field="last_name" header="Apellido"></Column>

      <Column field="role" header="Rol">
        <template #body="{ data }">
          <Tag :value="data.role.name" pt:label:class="text-xs font-normal" />
        </template>
      </Column>

      <Column field="phone" header="Telefono">
        <template #body="{ data }">
          <span class="flex items-center gap-2">
            <Icon name="lucide:phone" />
            {{ data.phone }}
          </span>
        </template>
      </Column>
      <Column field="dpi" header="DPI">
        <template #body="{ data }">
          <span class="flex items-center gap-2">
            <Icon name="lucide:id-card" />
            {{ data.dpi }}
          </span>
        </template>
      </Column>

      <!-- actions -->
      <Column field="actions" header="Acciones">
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <Button
              v-if="data.is_active"
              icon="pi pi-trash"
              severity="danger"
              size="small"
              fluid
              label="Desactivar"
              :disabled="disableUserLoading === 'loading'"
              @click="disableUser(data.id)"
            />
            <Button
              v-else
              icon="pi pi-check"
              severity="success"
              size="small"
              label="Activar"
              fluid
              :disabled="disableUserLoading === 'loading'"
              @click="disableUser(data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup>
  import { disableUserById, getAllUsers } from "~/lib/api/users";
  import { NuxtLink } from "#components";
  const toast = useToastService();
  const route = useRoute();

  // Data fetching
  const limit = ref(5);
  const currentPage = computed(() => {
    return limit.value * (route.query.page ? Number(route.query.page) - 1 : 0);
  });
  const { data, refresh, status } = await useAsyncData(
    () =>
      getAllUsers({
        ...route.query,
        per_page: limit.value,
      }),
    {
      watch: [() => route.query],
    },
  );

  //Disable user mutation
  const { mutate: disableUser, asyncStatus: disableUserLoading } = useMutation({
    mutation: (userId) => disableUserById(userId),
    onSuccess: (data) => {
      toast.add({
        severity: "success",
        summary: "Usuario modificado",
        detail: data.message,
      });
    },
    onError: (error) => {
      toast.add({
        severity: "error",
        summary: "Error al deshabilitar usuario",
        detail: error.data?.message || "No se pudo deshabilitar el usuario.",
      });
    },
    onSettled: () => {
      refresh();
    },
  });

  definePageMeta({
    layout: "admin",
  });
</script>
<style scoped></style>
