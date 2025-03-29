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
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import parchment from "@/assets/animation/parchment.png";
import magicbook from "@/assets/animation/magicbook.png";
import shields from "@/assets/animation/shields.png";

const route = useRoute();
const store = useCourseStoreManager();

const current_page = ref(parseInt(route.params.pageIndex as string, 10));
const { current_store } = storeToRefs(store);

watch(
  () => route.params.pageIndex,
  () => {
    current_page.value = parseInt(route.params.pageIndex as string, 10);
  }
);
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
