<template>
  <EnterAnimation :src="emblems[emblem]" :alt="emblem" />
</template>

<script setup lang="ts" name="Animation">
const { emblem } = defineProps<{ emblem: string }>();

const images = import.meta.glob('@/assets/emblem/*.png', { eager: true });
const emblems = Object.entries(images).reduce((acc, [path, module]) => {
  const name = path.match(/([^\/]+)\.png$/)![1];
  if (name) acc[name] = (module as any).default;
  return acc;
}, {} as { [courseId: string]: string });
</script>
