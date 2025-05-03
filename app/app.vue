<template>
  <div>
    <NuxtLoadingIndicator
      :height="3"
      color="var(--p-primary-color)"
      :throttle="20"
    />
    <NuxtLayout>
      <slot />
    </NuxtLayout>
    <Toast
      :position="'top-center'"
      :pt="{
        detail: { class: '!text-xs' },
        summary: { class: '!text-sm !font-semibold' },
      }"
    />
  </div>
</template>
<script setup>
import Toast from "primevue/toast";

useHead({
    title: "Administración Cementerio - Proyecto TS2",
  });
</script>
<style>
@import '~/assets/css/main.css';

body, html {
  @apply bg-white dark:bg-zinc-950;
}
</style>
