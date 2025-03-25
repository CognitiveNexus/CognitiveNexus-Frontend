<template>
    <el-row>
        <el-col :span="12">
            <MonacoEditor v-model="code" :disabled="loading || running" :highlight-line="currentStepData?.line" />
            <el-input v-model="stdin" :rows="2" :disabled="loading" type="textarea" placeholder="stdin"></el-input>
            <el-button :disabled="loading" @click="running ? stopCodeRun() : runCode()">{{ running ? 'Stop' : 'Run' }}</el-button>
        </el-col>
        <el-col :span="12">
            <el-pagination
                v-model:current-page="currentStep"
                :disabled="loading"
                :page-size="1"
                :total="codeRunnerData.steps.length"
                layout="total, prev, pager, next" />

            <br />
            <template v-for="variable in currentVariables">
                <el-text class="mx-1">
                    变量 {{ variable.name }} <@{{ variable.address }}>: {{ currentStepData.memory[`${variable.address}:${variable.typeId}`]?.value }}
                </el-text>
                <br />
            </template>
            <el-text class="mx-1">stdout: {{ currentStdout }}</el-text>
            <div ref="graphContainer"></div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { ElInput, ElButton, ElMessage, ElNotification, ElRow, ElCol } from 'element-plus';
import { Graph, type GraphData } from '@antv/g6';
import type { CNCRResult, CNCRData, CNCRMemoryIndex } from '@/types/CodeRunnerTypes';
import MonacoEditor from '@/components/MonacoEditor.vue';

const host = 'https://cognitivenexus.bobliu.tech:8888';

const code = ref<string>(
    '#include <stdio.h>\n\nint main() {\n    int a = 1, *b = &a;\n    printf("a = %d\\n", a);\n    *b = 114514;\n    printf("a = %d\\n", a);\n    return 0;\n}'
);
const stdin = ref<string>('');
const loading = ref<boolean>(false);
const running = ref<boolean>(false);

const blankCodeRunnerData: CNCRData = { typeDefinitions: {}, steps: [], endState: 'finished' };
const codeRunnerData = ref<CNCRData>(blankCodeRunnerData);
const currentStep = ref<number>(0);

const currentStepData = computed(() => codeRunnerData.value.steps[currentStep.value - 1]);
const currentVariables = computed(() => currentStepData.value?.variables || []);
const currentStdout = computed(() => currentStepData.value?.stdout || '');

let graph: Graph;
const graphContainer = ref<HTMLElement>();
onMounted(() => {
    graph = new Graph({
        container: graphContainer.value,
        width: 500,
        height: 500,
        autoResize: true,
        data: {},
        layout: {
            type: 'force',
        },
        plugins: [
            {
                type: 'grid-line',
                size: 50,
                follow: true,
            },
        ],
        behaviors: ['drag-canvas', 'zoom-canvas', 'click-select', 'drag-element', 'focus-element'],
    });
    graph.render();
    watch(currentStep, renderStepData);
});

const renderStepData = () => {
    let data: GraphData = { nodes: [], edges: [] };
    const renderedMemories: CNCRMemoryIndex[] = [];
    for (let variable of currentStepData.value?.variables ?? []) {
        const varMemory: CNCRMemoryIndex = `${variable.address}:${variable.typeId}`;
        const varValue = currentStepData.value.memory[varMemory].value ?? '??';
        data.nodes?.push({
            id: varMemory,
            type: 'rect',
            style: {
                iconText: varValue,
                label: true,
                labelText: `${variable.name} @${varMemory}`,
                size: [256, 48],
            },
        });
        renderedMemories.push(varMemory);
    }
    for (let memory in currentStepData.value.memory) {
        let varMemory: CNCRMemoryIndex = memory as CNCRMemoryIndex;
        if (renderedMemories.includes(varMemory)) {
            continue;
        }
        data.nodes?.push({
            id: memory,
            type: 'rect',
            style: {
                iconText: currentStepData.value.memory[varMemory].value,
                label: true,
                labelText: `@${memory}`,
                size: [256, 48],
            },
        });
        renderedMemories.push(varMemory);
    }
    graph.setData(data);
    graph.render();
};

const stopCodeRun = () => {
    codeRunnerData.value = blankCodeRunnerData;
    currentStep.value = 0;
    graph.setData({});
    graph.render();
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
                renderStepData();
            }
        })
        .finally(() => {
            loading.value = false;
        });
};
</script>

<style scoped></style>
