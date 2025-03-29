<template>
  <div class="main">
    <motion.div
      :initial="{ opacity: 0, scale: 0 }"
      :animate="{ opacity: 1, scale: 1 }"
      :whileHover="{ scale: 1.2 }"
      :whilePress="{ scale: 0.8 }"
      :transition="{
        duration: 0.4,
        scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
      }"
      class="ani"
    >
      <img :src="src" :alt="alt" />
    </motion.div>
  </div>
</template>

<script setup lang="ts" name="EnterAnimation">
import { motion } from "motion-v";

const props = defineProps({
  src: String,
  alt: String,
});
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
}
.ani {
  width: 400px;
  height: 400px;
  overflow: hidden;
}
img {
  width: 400px;
}
</style>
