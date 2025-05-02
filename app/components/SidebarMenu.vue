<template>
  <template v-for="(item, index) in items" :key="index">

  </template>
</template>
<script setup lang="ts">
const props = defineProps<{
  items: Array<{
    label: string;
    icon?: string;
    to?: string;
    type: 'item' | 'header';
  }>;
}>()
</script>
<style scoped>
</style>