<template>
    <div class="container">
        <div class="top-bar">
            <el-button
                circle
                plain
                :disabled="loading"
                :icon="running ? VideoPause : VideoPlay"
                :type="running ? 'danger' : 'success'"
                @click="running ? stopCodeRun() : runCode()" />
            <el-pagination
                v-model:current-page="currentStep"
                :disabled="loading"
                :page-size="1"
                :total="codeRunnerData.steps.length"
                layout="total, prev, pager, next" />
        </div>
        <hpcc-dockpanel style="width: 100%; height: 100%">
            <div id="code-runner-source-code" data-label="源代码" data-mode="split-left">
                <CodeEditor v-model="code" :disabled="loading || running" :highlight-line="currentStepData?.line" />
                <el-input v-model="stdin" :rows="2" :disabled="loading" type="textarea" placeholder="stdin"></el-input>
            </div>
            <div id="code-runner-memory" data-label="内存可视化" data-mode="split-right" data-ref="code-runner-source-code">
                <CodeRunnerGraph :currentStepData="currentStepData" :typeDefinitions="typeDefinitions" />
            </div>
            <div id="code-runner-stdout" data-label="程序输出" data-mode="split-bottom" data-ref="code-runner-source-code">
                <el-text class="keepLineBreak"> {{ currentStdout }}</el-text>
            </div>
            <div id="code-runner-compile-log" data-label="编译日志" data-mode="tab-after" data-ref="code-runner-stdout">
                <el-text class="keepLineBreak">{{ compileLog }}</el-text>
            </div>
            <div id="code-runner-run-log" data-label="运行日志" data-mode="tab-after" data-ref="code-runner-compile-log">
                <el-text class="keepLineBreak">{{ runLog }}</el-text>
            </div>
        </hpcc-dockpanel>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElInput, ElButton, ElMessage, ElNotification, ElPagination, ElText } from 'element-plus';
import { VideoPlay, VideoPause } from '@element-plus/icons-vue';
import type { CNCRResult, CNCRData } from '@/types/CodeRunnerTypes';
import '@hpcc-js/wc-layout';
import CodeEditor from '@/components/CodeEditor.vue';
import CodeRunnerGraph from '@/components/CodeRunnerGraph.vue';

const host = import.meta.env.CNCR_API_HOST;

const code = ref<string>(
    '#include <stdio.h>\n\nint main() {\n    int a = 1, *b = &a;\n    printf("a = %d\\n", a);\n    *b = 114514;\n    printf("a = %d\\n", a);\n    return 0;\n}'
);
const stdin = ref<string>('');
const loading = ref<boolean>(false);
const running = ref<boolean>(false);

const blankCodeRunnerData: CNCRData = { typeDefinitions: {}, steps: [], endState: 'finished' };
const codeRunnerData = ref<CNCRData>(blankCodeRunnerData);
const currentStep = ref<number>(0);
const compileLog = ref<string>('(空)');
const runLog = ref<string>('(空)');

const currentStepData = computed(() => codeRunnerData.value.steps[currentStep.value - 1] ?? {});
const currentStdout = computed(() => currentStepData.value?.stdout || '(空)');
const typeDefinitions = computed(() => codeRunnerData.value.typeDefinitions ?? {});

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
    loading.value = true;
    codeRunnerData.value = blankCodeRunnerData;
    await fetch(`${host}/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            code: code.value,
            stdin: stdin.value,
            usst: '1906',
        }),
    })
        .then((response) => response.json())
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
                        '<br />' +
                        result.data.steps.at(-1)?.stdout,
                    dangerouslyUseHTMLString: true, // TODO: remove
                    type: result.data.endState === 'finished' ? 'success' : 'warning',
                });
                running.value = true;
                codeRunnerData.value = result.data;
                currentStep.value = 1;
            }
            compileLog.value = result.logs.compile || '(空)';
            runLog.value = result.logs.run || '(空)';
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
    margin-top: 8px;
    margin-bottom: 8px;
}
hpcc-dockpanel {
    flex: 1;
}
.keepLineBreak {
    white-space: pre-line;
}
</style>
