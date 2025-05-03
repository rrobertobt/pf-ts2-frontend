<template>
  <main>
    <Drawer v-model:visible="drawerOpen" header="Menu">
      <template #footer>
        <Divider />
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-semibold inline-flex items-center gap-x-2">
            <Icon name="lucide:user" />
            {{ session?.first_name }} {{ session?.last_name }}
          </h4>
          <Button
            label="Cerrar sesión"
            icon="pi pi-sign-out"
            class="!text-xs"
            severity="danger"
            text
            @click="logout"
            size="small"
          />
        </div>
      </template>
      <SidebarMenu :items="sidebarItems" />
    </Drawer>
    <header
      class="flex py-4 px-4 lg:px-12 lg:max-w-screen-2xl mx-auto w-full justify-between sticky top-0 z-10 mb-5 border-b border-neutral-700 bg-zinc-950 shadow-md"
    >
      <Button
        v-tooltip.left="{
          value: 'Menú',
          pt: {
            text: '!font-medium !text-xs !p-1.5',
          },
        }"
        icon="pi pi-bars"
        text
        severity="secondary"
        size="small"
        @click="drawerOpen = !drawerOpen"
        class="lg:!hidden"
      />
      <h2 class="text-xl font-normal flex items-center">
        <Icon name="lucide:church" class="mr-2 hidden md:block" />
        Cementerio - &nbsp;<span class="font-semibold"> Consulta</span>
      </h2>
      <div class="items-center gap-x-4 hidden lg:flex">
        <h4 class="text-sm font-semibold inline-flex items-center gap-x-2">
          <Icon name="lucide:user" />
          {{ session?.first_name }} {{ session?.last_name }}
        </h4>
        <Button
          v-tooltip.bottom="{
            value: 'Cerrar sesión',
            pt: {
              text: '!font-medium !text-xs !p-1.5',
            },
          }"
          icon="pi pi-sign-out"
          severity="danger"
          text
          @click="logout"
          size="small"
        />
      </div>
    </header>
    <div class="flex gap-x-7 lg:px-16 px-4 lg:max-w-screen-2xl mx-auto">
      <div class="w-64 shrink-0 hidden lg:block">
        <SidebarMenu :items="sidebarItems" />
      </div>
      <NuxtPage />
    </div>
  </main>
</template>
<script setup>
  import SidebarMenu from "~/components/SidebarMenu.vue";

  const sessionStore = useSessionStore();
  const { logout } = sessionStore;
  const { session } = storeToRefs(sessionStore);

  const drawerOpen = ref(false);

  const sidebarItems = [
    {
      label: "Navegación",
      items: [
        { label: "Inicio", icon: "lucide:house", to: "/admin" },
        { label: "Perfil", icon: "lucide:user", to: "/admin/profile" },
        
      ],
    },
    {
      label: "Administración",
      items: [
        {
          label: "Usuarios",
          icon: "lucide:users",
          to: "/admin/users",
        },
        {
          label: "Nichos",
          icon: "tabler:grave",
          to: "/admin/niches",
        },
        {
          label: "Ocupantes",
          icon: "lucide:user-x",
          to: "/admin/occupants",
        },
        {
          label: "Contratos y pagos",
          icon: "lucide:user-x",
          to: "/admin/contracts-payments",
        },
      ],
    },
  ];
</script>
<style scoped></style>
