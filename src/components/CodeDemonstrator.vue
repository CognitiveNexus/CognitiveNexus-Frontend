<template>
  <div class="code-demonstrator">
    <div class="code-demonstrator-chart">
      <ColumnChart :useStore="columnChart.store" :content="columnChart.content" :theme="columnChart.theme" />
    </div>
    <div class="code-demonstrator-editor">
      <CodeEditor :modelValue="code" :highlightLine="highlightLine" :defaultLine="1" disabled />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import type { ChartStore } from '@/types/ChartStoreTypes';

const { columnChart, code, codeLine } = defineProps<{
  columnChart: {
    store: ChartStore;
    content: string[];
    theme: string;
  };
  code: string;
  codeLine: (step: number) => number;
}>();

const { current_page: currentStep } = storeToRefs(columnChart.store());
const highlightLine = computed<number>(() => codeLine(currentStep.value));
</script>

<style scoped>
.code-demonstrator {
  display: flex;
  gap: 12px;
  align-items: stretch;
  padding-right: 48px;
}

.code-demonstrator-chart,
.code-demonstrator-editor {
  flex: 1;
}

.code-demonstrator-editor {
  background-color: #ffffff;
  border: solid 10px #672917;
  border-radius: 5px;
}
</style>
