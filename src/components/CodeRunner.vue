<template>
    <el-input v-model="code" :rows="12" type="textarea" placeholder="/* Your C code here */"></el-input>
    <el-input v-model="stdin" :rows="2" type="textarea" placeholder="stdin"></el-input>
    <el-button :disabled="loading" @click="runCode()">Run</el-button>
    <el-pagination
        v-model:current-page="currentStep"
        :disabled="loading"
        :page-size="1"
        :total="codeRunnerData.steps.length"
        layout="total, prev, pager, next" />
    <br />
    <template v-for="(line, index) in codeRunnerCode.split('\n')">
        <span :style="{ backgroundColor: index + 1 == codeRunnerData.steps[currentStep]?.line - 1 ? '#FFF59D' : '' }"> {{ line }} </span>
        <br />
    </template>
    <template v-for="(varAddr, varName) in codeRunnerData.steps[currentStep]?.variables">
        <el-text class="mx-1">变量 {{ varName }} <@{{ varAddr }}>: {{ codeRunnerData.steps[currentStep].memory[varAddr]?.value }}</el-text>
        <br />
    </template>
    <el-text class="mx-1">stdout: {{ codeRunnerData.steps[currentStep]?.stdout }}</el-text>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElInput, ElButton, ElMessage, ElNotification } from 'element-plus';
import type { CodeRunnerResult, CodeRunnerData } from '@/types/CodeRunnerTypes';

const host = 'https://cognitivenexus.bobliu.tech:8888';

const code = ref<string>(
    '#include <stdio.h>\n\nint main() {\n    int a = 1, *b = &a;\n    printf("a = %d\\n", a);\n    *b = 114514;\n    printf("a = %d\\n", a);\n    return 0;\n}'
);
const stdin = ref<string>('');
const loading = ref<boolean>(false);

const blankCodeRunnerData: CodeRunnerData = { struct: {}, steps: [], endState: 'finished' };
const codeRunnerData = ref<CodeRunnerData>(blankCodeRunnerData);
const codeRunnerCode = ref<string>('');
const currentStep = ref<number>(0);

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
    codeRunnerCode.value = code.value;
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
        .then((result: CodeRunnerResult) => {
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
                codeRunnerData.value = result.data;
            }
        })
        .finally(() => {
            loading.value = false;
        });
};
</script>

<style scoped></style>
