<template>
  <Motion
    as="div"
    :whileInView="{
      rotate: [-3, 3],
    }"
    :transition="{
      repeat: Infinity, // 无限循环
      repeatType: 'mirror', // 镜像回放（更自然）
      ease: 'easeInOut',
      repeatDelay: 0.5,
      duration: 3,
    }"
    class="relative flex flex-col items-center justify-center gap-4 px-4"
  >
    <slot></slot>
  </Motion>
</template>

<script setup lang="ts" name="InfiniteMoving">
import { Motion } from 'motion-v';
</script>

<style scoped></style>
