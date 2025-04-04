<template>
  <Motion
    as="div"
    :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }"
    :in-view="{
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
    }"
    :transition="{
      delay: 0.3,
      duration: 0.8,
      ease: 'easeInOut',
    }"
    class="relative flex flex-col items-center justify-center gap-4 px-4"
  >
    <slot></slot>
  </Motion>
</template>

<script setup lang="ts" name="BlurEntrance">
import { Motion } from 'motion-v';
</script>

<style scoped></style>
