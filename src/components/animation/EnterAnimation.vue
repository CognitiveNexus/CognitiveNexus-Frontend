<template>
  <div class="main">
    <Motion
      as="div"
      :initial="{ opacity: 0, y: 40, filter: 'blur(10px)' }"
      :whileInView="{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }"
      :transition="{
        delay: 0.3,
        duration: 0.8,
        ease: 'easeInOut',
      }"
    >
      <img :src="src" :alt="alt" />
    </Motion>
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
  padding: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ani {
  padding: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  width: 100vh;
  max-height: 90vh;
}
</style>
