<template>
    <el-row>
        <!-- TODO: better layout -->
        <CodeEditor v-model="code" :disabled="loading || running" :highlight-line="currentStepData?.line" />
        <el-input v-model="stdin" :rows="2" :disabled="loading" type="textarea" placeholder="stdin"></el-input>
        <el-button :disabled="loading" @click="running ? stopCodeRun() : runCode()">{{ running ? 'Stop' : 'Run' }}</el-button>
        <el-pagination
            v-model:current-page="currentStep"
            :disabled="loading"
            :page-size="1"
            :total="codeRunnerData.steps.length"
            layout="total, prev, pager, next" />

        <br />
        <el-text class="mx-1">stdout: {{ currentStdout }}</el-text>
        <CodeRunnerGraph :currentStepData="currentStepData" :typeDefinitions="typeDefinitions" />
    </el-row>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElInput, ElButton, ElMessage, ElNotification, ElRow, ElCol, ElPagination, ElText } from 'element-plus';
import type { CNCRResult, CNCRData } from '@/types/CodeRunnerTypes';
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

const currentStepData = computed(() => codeRunnerData.value.steps[currentStep.value - 1] ?? {});
const currentStdout = computed(() => currentStepData.value?.stdout || '');
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
                    dangerouslyUseHTMLString: true,
                    type: result.data.endState === 'finished' ? 'success' : 'warning',
                });
                running.value = true;
                codeRunnerData.value = result.data;
                currentStep.value = 1;
            }
        })
        .finally(() => {
            loading.value = false;
        });
};
</script>

<style scoped></style>
