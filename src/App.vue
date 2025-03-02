<template>
    <div class="app">
      <ArrayColumnGraph :array="array_list" />
    </div>
</template>

<script lang="ts">
  import ArrayColumnGraph from './components/ArrayColumnGraph.vue';

  export default {
    name: 'App',
    components:{ArrayColumnGraph}
  }
</script>

<script setup lang="ts">
import { type array_list } from '@/types';
import { reactive } from 'vue';

let array_list = reactive<array_list>([
  { index: 1, value: Math.ceil(Math.random() * 10) },
  { index: 2, value: Math.ceil(Math.random() * 10) },
  { index: 3, value: Math.ceil(Math.random() * 10) },
  { index: 4, value: Math.ceil(Math.random() * 10) },
  { index: 5, value: Math.ceil(Math.random() * 10) },
  { index: 6, value: Math.ceil(Math.random() * 10) },
  { index: 7, value: Math.ceil(Math.random() * 10) },
  { index: 8, value: Math.ceil(Math.random() * 10) },
  { index: 9, value: Math.ceil(Math.random() * 10) },
])
</script>

<style scoped>

</style>