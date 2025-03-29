<template>
  <div class="main">
    <EnterAnimation :src="magicbook" alt="魔法书" v-if="current_page === 1" />
    <EnterAnimation :src="parchment" alt="羊皮卷" v-if="current_page === 2" />
    <EnterAnimation :src="shields" alt="盾牌" v-if="current_page === 3" />
  </div>
</template>

<script setup lang="ts" name="BubbleAnimation">
import { useCourseStoreManager } from "@/stores/courses";
import { storeToRefs } from "pinia";
import parchment from "@/assets/animation/parchment.png";
import magicbook from "@/assets/animation/magicbook.png";
import shields from "@/assets/animation/shields.png";

const store = useCourseStoreManager();
const { current_store, current_page } = storeToRefs(store);
</script>

<style scoped>
.main {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
