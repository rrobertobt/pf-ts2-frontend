<template>
  <Menu :model="items" pt:root:class=" p-2 not-dark:border-none!">
    <template #item="{ item, props }">
      <NuxtLink
        active-class="!bg-primary/30"
        class="flex items-center p-2 rounded-lg my-0.5 space-x-3"
        :to="item.to"
      >
        <Icon :name="item.icon" />
        <span>{{ item.label }}</span>
      </NuxtLink>
    </template>
  </Menu>
</template>
<script setup>
  const props = defineProps({
    items: {
      type: Array,
      default: () => [],
    },
  });
</script>
<style scoped></style>
