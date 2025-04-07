<template>
  <div class="code-judger-container">
    <div class="top-bar">
      <el-button circle plain :disabled="loading" :icon="VideoPlay" type="success" @click="judge" />
    </div>
    <DockPanel style="width: 100%; height: 100%">
      <DockWidget v-for="slotName in Object.keys(slots)" :id="'code-runner-custom-' + slotName" :title="slotName" mode="tab-after">
        <slot :name="slotName"></slot>
      </DockWidget>
      <DockWidget id="code-judger-source-code" title="源代码" :mode="slotsCount ? 'split-right' : 'tab-after'">
        <CodeEditor v-model="code" :disabled="loading" :defaultLine="defaultLine" />
      </DockWidget>
      <DockWidget id="code-judger-result" title="运行结果" mode="split-right" ref-id="code-judger-source-code" v-loading="loading">
        <el-collapse v-model="activeResults">
          <el-collapse-item v-for="(test, i) of judgeResult" :name="i.toString()">
            <template #title>
              <el-text :type="test.passed ? 'success' : 'danger'">测试{{ i + 1 }} {{ test.passed ? '通过' : '未通过' }}</el-text>
            </template>
            <el-text>输入：</el-text>
            <pre>{{ test.stdin || '(空)' }}</pre>
            <el-text>预期输出：</el-text>
            <pre>{{ test.expect || '(空)' }}</pre>
            <el-text>实际输出：</el-text>
            <pre>{{ test.stdout || '(空)' }}</pre>
          </el-collapse-item>
        </el-collapse>
        <Confetti ref="confettiRef" class="absolute left-0 top-0 z-0 size-full no-pointer-events" style="pointer-events: none" manualstart />
      </DockWidget>
    </DockPanel>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue';
import { ElButton, ElMessage, ElNotification } from 'element-plus';
import { VideoPlay } from '@element-plus/icons-vue';
import DockPanel from '@/components/layout/DockPanel.vue';
import DockWidget from '@/components/layout/DockWidget.vue';
import CodeEditor from '@/components/CodeEditor.vue';
import sendRequest from '@/utils/SendRequest.ts';

const emit = defineEmits(['accomplished']);

type CodeTest = { stdin: string; expect: string };
const { defaultCode, defaultLine, tests, generateTest } = defineProps<{
  defaultCode?: string;
  defaultLine?: number;
  tests?: CodeTest[];
  generateTest?: () => CodeTest[];
}>();
const confettiRef = ref();

const slots = useSlots();
const slotsCount = computed(() => Object.keys(slots).length);

const code = ref<string>(defaultCode ?? '#include <stdio.h>\n\nint main(){\n    // 开始编写代码吧！\n    \n    return 0;\n}');
const loading = ref<boolean>(false);

const judgeResult = ref<any>();
const activeResults = ref<string[]>([]);

const judge = () => {
  if (!code.value) {
    ElMessage({
      message: '代码内容为空',
      type: 'warning',
      plain: true,
    });
    return;
  }
  loading.value = true;

  const generatedTests = Array.from(tests ?? []).concat(typeof generateTest === 'function' ? generateTest() : []);
  judgeResult.value = [];
  activeResults.value = [];

  sendRequest(true, '/api/code/judge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: code.value,
      tests: generatedTests,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      let failed: string[] = [];
      judgeResult.value = result.data.tests;
      for (const i in judgeResult.value) {
        const test = judgeResult.value[i];
        test.passed = test.expect.trim() === test.stdout.trim();
        if (!test.passed) failed.push(i.toString());
      }
      if (!failed.length) {
        activeResults.value = Array.from({ length: judgeResult.value.length }, (_, i) => i.toString());
        confettiRef.value?.fire({});
        emit('accomplished');
      } else {
        activeResults.value = failed;
      }
    })
    .catch((reason: Error) => {
      ElNotification({
        title: '执行失败',
        message: reason.message,
        type: 'error',
      });
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style scoped>
.code-judger-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  padding-bottom: 0px;
}
</style>
