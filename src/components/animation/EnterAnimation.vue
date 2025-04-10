<template>
  <div class="main">
    <motion.div
      :key="animationKey"
      :initial="{ opacity: 0, scale: 0 }"
      :animate="{ opacity: 1, scale: 1 }"
      :whileHover="{ scale: 1.2 }"
      :whilePress="{ scale: 0.8 }"
      :transition="{
        duration: 0.4,
        scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
      }"
      class="ani">
      <img :src="src" :alt="alt" />
    </motion.div>
  </div>
</template>

<script setup lang="ts" name="EnterAnimation">
import { motion } from 'motion-v';
import { ref, watch } from 'vue';

const props = defineProps({
  src: String,
  alt: String,
});

const animationKey = ref(0);

watch(
  () => props.src,
  () => {
    animationKey.value++;
  }
);
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ani {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  width: 500px;
}
</style>
