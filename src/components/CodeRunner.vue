<template>
  <div class="container">
    <div class="top-bar">
      <el-button
        circle
        plain
        :disabled="loading"
        :icon="running ? VideoPause : VideoPlay"
        :type="running ? 'danger' : 'success'"
        @click="running ? stopCodeRun() : runCode()"
      />
      <el-pagination
        v-model:current-page="currentStep"
        :disabled="loading"
        :page-size="1"
        :total="codeRunnerData.steps.length"
        layout="slot, prev, pager, next"
      >
        <el-text
          >第 {{ currentStep }} 步 / 共
          {{ codeRunnerData.steps.length }} 步</el-text
        >
      </el-pagination>
    </div>
    <DockPanel style="width: 100%; height: 100%">
      <DockWidget
        v-for="slotName in Object.keys(slots)"
        :id="'code-runner-custom-' + slotName"
        :title="slotName"
        mode="tab-after"
      >
        <slot :name="slotName"></slot>
      </DockWidget>
      <DockWidget
        id="code-runner-source-code"
        title="源代码"
        :mode="slotsCount ? 'split-right' : 'tab-after'"
      >
        <CodeEditor
          v-model="code"
          :disabled="loading || running"
          :highlight-line="currentStepData?.line"
        />
      </DockWidget>
      <DockWidget
        id="code-runner-stdin"
        title="程序输入"
        mode="tab-after"
        ref-id="code-runner-source-code"
      >
        <el-input
          v-model="stdin"
          :disabled="loading"
          type="textarea"
          placeholder="输入程序读取的标准输入流的内容"
        />
      </DockWidget>
      <DockWidget
        id="code-runner-memory"
        title="内存可视化"
        :mode="slotsCount ? 'tab-after' : 'split-right'"
        ref-id="code-runner-source-code"
      >
        <CodeRunnerGraph
          :currentStepData="currentStepData"
          :typeDefinitions="typeDefinitions"
        />
      </DockWidget>
      <DockWidget
        id="code-runner-stdout"
        title="程序输出"
        :mode="slotsCount ? 'tab-after' : 'split-bottom'"
        :ref-id="slotsCount ? 'code-runner-stdin' : 'code-runner-source-code'"
      >
        <el-text class="keepLineBreak"> {{ currentStdout }}</el-text>
      </DockWidget>
      <DockWidget
        id="code-runner-compile-log"
        title="编译日志"
        mode="tab-after"
        ref-id="code-runner-stdout"
      >
        <el-text class="keepLineBreak">{{ compileLog }}</el-text>
      </DockWidget>
      <DockWidget
        id="code-runner-run-log"
        title="运行日志"
        mode="tab-after"
        ref-id="code-runner-compile-log"
      >
        <el-text class="keepLineBreak">{{ runLog }}</el-text>
      </DockWidget>
    </DockPanel>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue';
import { storeToRefs } from 'pinia';
import {
  ElInput,
  ElButton,
  ElMessage,
  ElNotification,
  ElPagination,
  ElText,
} from 'element-plus';
import { VideoPlay, VideoPause } from '@element-plus/icons-vue';
import type { CNCRResult, CNCRData } from '@/types/CodeRunnerTypes';
import DockPanel from '@/components/layout/DockPanel.vue';
import DockWidget from '@/components/layout/DockWidget.vue';
import CodeEditor from '@/components/CodeEditor.vue';
import CodeRunnerGraph from '@/components/CodeRunnerGraph.vue';
import { useAuthStore } from '@/stores/Auth';

const host = import.meta.env.COGNEX_API_HOST ?? '';

const slots = useSlots();
const slotsCount = computed(() => Object.keys(slots).length);

const authStore = useAuthStore();
const { token, isAuthenticated, showLoginDialog } = storeToRefs(authStore);

const code = ref<string>(
  '#include <stdio.h>\n\nint main() {\n    int a = 1, *b = &a;\n    printf("a = %d\\n", a);\n    *b = 114514;\n    printf("a = %d\\n", a);\n    return 0;\n}'
);
const stdin = ref<string>('');
const loading = ref<boolean>(false);
const running = ref<boolean>(false);

const blankCodeRunnerData: CNCRData = {
  typeDefinitions: {},
  steps: [],
  endState: 'finished',
};
const codeRunnerData = ref<CNCRData>(blankCodeRunnerData);
const currentStep = ref<number>(0);
const compileLog = ref<string>('(空)');
const runLog = ref<string>('(空)');

const currentStepData = computed(
  () => codeRunnerData.value.steps[currentStep.value - 1] ?? {}
);
const currentStdout = computed(() => currentStepData.value?.stdout || '(空)');
const typeDefinitions = computed(
  () => codeRunnerData.value.typeDefinitions ?? {}
);

const stopCodeRun = () => {
  codeRunnerData.value = blankCodeRunnerData;
  currentStep.value = 0;
  running.value = false;
};

const runCode = async () => {
  if (!code.value) {
    ElMessage({
      message: '代码内容为空',
      type: 'warning',
      plain: true,
    });
    return;
  }
  if (!isAuthenticated.value) {
    ElMessage({
      message: '用户未登录',
      type: 'warning',
      plain: true,
    });
    showLoginDialog.value = true;
    return;
  }
  loading.value = true;
  codeRunnerData.value = blankCodeRunnerData;
  await fetch(`${host}/api/run-code`, {
    method: 'POST',
    headers: {
      Authorization: token.value!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: code.value,
      stdin: stdin.value,
    }),
  })
    .then(async (response) => {
      if (response.status == 200) {
        return response.json();
      } else if (response.status == 401) {
        showLoginDialog.value = true;
      }
      throw new Error((await response.json()).error);
    })
    .then((result: CNCRResult) => {
      if (result.status === 'error') {
        if (!result.logs.run && result.logs.compile) {
          ElNotification({
            title: '执行失败：编译失败',
            message: result.logs.compile,
            type: 'error',
          });
        } else if (result.message === 'empty result' && result.logs.run) {
          ElNotification({
            title: '执行失败：运行失败',
            message: result.logs.run,
            type: 'error',
          });
        } else {
          ElNotification({
            title: '执行失败：未知错误',
            message: result.message,
            type: 'error',
          });
        }
      } else {
        ElNotification({
          title: '执行完成',
          message:
            {
              finished: '正常结束',
              timeout: '运行超时',
              overstep: '步数超限',
              aborted: '异常终止',
            }[result.data.endState] +
            '\n' +
            result.data.steps.at(-1)?.stdout,
          type: result.data.endState === 'finished' ? 'success' : 'warning',
        });
        running.value = true;
        codeRunnerData.value = result.data;
        currentStep.value = 1;
      }
      compileLog.value = result.logs.compile || '(空)';
      runLog.value = result.logs.run || '(空)';
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
.container {
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
.keepLineBreak {
  white-space: pre-line;
}
</style>
