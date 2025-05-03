<template>
  <IftaLabel class="w-full" variant="in">
    <AutoComplete
      v-model="selectedUser"
      :option-label="(option) => `${option.dpi} - ${option.first_name} ${option.last_name}`"
      variant="filled"
      fluid
      input-id="current_niche_id"
      force-selection
      :suggestions="data?.data"
      placeholder="Escribe el DPI del usuario"
      :loading="loading"
      @complete="(e) => (userDpiSearch = e.query)"
      @option-select="(e) => {
        $emit('select', e.value);
      }"
    >
      <template #option="slotProps">
        <strong>{{ slotProps.option.dpi }}</strong>
        &nbsp;-&nbsp;
        <span>{{ `${slotProps.option.first_name} ${slotProps.option.last_name}` }}</span>
      </template>  
    </AutoComplete>
    <label for="current_niche_id">Nicho a asignar</label>
  </IftaLabel>
</template>
<script setup>
  import { getAllUsers } from "~/lib/api/users";

  const selectedUser = ref(null);
  const userDpiSearch = ref("");

  const { data, loading } = await useAsyncData(() =>
    getAllUsers({
      is_regular: true,
      dpi: userDpiSearch.value,
    }),
    {
      lazy: true,
      watch: [userDpiSearch],
    }
  );
</script>
<style scoped></style>
