<template>
    <div ref="graphContainer"></div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { Graph, type GraphData, type NodeData } from '@antv/g6';
import type { CNCRMemoryIndex, CNCRStep } from '@/types/CodeRunnerTypes';

const props = defineProps<{ currentStepData: CNCRStep }>();

let graph: Graph;
let graphData: GraphData = { nodes: [], edges: [] };
const graphContainer = ref<HTMLElement>();

onMounted(() => {
    graph = new Graph({
        container: graphContainer.value,
        autoResize: true,
        data: {},
        layout: {
            type: 'force',
        },
        plugins: [
            {
                type: 'grid-line',
                size: 50,
            },
        ],
        behaviors: ['drag-canvas', 'zoom-canvas', 'click-select', 'drag-element', 'focus-element'],
        node: {
            palette: {
                field: 'typeId',
            },
        },
    });
    graph.render();
    watch(() => props.currentStepData, renderStepData);
});

const createNode = (memoryIndex: CNCRMemoryIndex, varName: string = ''): NodeData => {
    return {
        id: memoryIndex,
        type: 'rect',
        style: {
            iconText: props.currentStepData.memory[memoryIndex].value,
            label: true,
            labelText: `${varName} @${memoryIndex}`.trim(),
            size: [256, 48],
        },
        data: {
            typeId: memoryIndex.split(':')[1],
        },
    };
};

const renderStepData = () => {
    graphData = { nodes: [], edges: [] };
    const variables: CNCRMemoryIndex[] = [];
    for (const variable of props.currentStepData?.variables ?? []) {
        const varMemory: CNCRMemoryIndex = `${variable.address}:${variable.typeId}` as CNCRMemoryIndex;
        graphData.nodes?.push(createNode(varMemory, variable.name));
        variables.push(varMemory);
    }
    for (const memory in props.currentStepData.memory) {
        const varMemory: CNCRMemoryIndex = memory as CNCRMemoryIndex;
        if (variables.includes(varMemory)) {
            continue;
        }
        graphData.nodes?.push(createNode(varMemory));
        variables.push(varMemory);
    }
    graph.setData(graphData);
    graph.render();
};
</script>
