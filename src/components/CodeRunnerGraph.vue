<template>
    <div ref="graphContainer"></div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { Graph, type GraphData, type NodeData } from '@antv/g6';
import type { CNCRMemoryIndex, CNCRStep, CNCRTypeDefinitions, CNCRVarAddress, CNCRVarTypeId } from '@/types/CodeRunnerTypes';

const { currentStepData, typeDefinitions } = defineProps<{
    currentStepData: CNCRStep;
    typeDefinitions: CNCRTypeDefinitions;
}>();

let graph: Graph;
let graphData: GraphData = { nodes: [], edges: [], combos: [] };
let createdNode: { [memoryIndex: CNCRMemoryIndex]: NodeData } = {};
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
        edge: {
            style: {
                startArrow: false,
                endArrow: true,
                stroke: 'black',
                lineWidth: 2,
                zIndex: 5,
            },
        },
    });
    graph.render();
    watch(() => currentStepData, renderStepData);
});

const createNode = (graphData: GraphData, address: CNCRVarAddress, typeId: CNCRVarTypeId, varName: string = '') => {
    const typeDefinition = typeDefinitions[typeId];
    const memoryIndex: CNCRMemoryIndex = `${address}:${typeId}`;
    const varValue = currentStepData.memory[memoryIndex].value;
    if (createdNode[memoryIndex]) {
        if (varName && createdNode[memoryIndex].style?.labelText) createdNode[memoryIndex].style.labelText = `${varName} @${memoryIndex}`;
        return;
    }
    if (typeDefinition.base == 'atomic' || typeDefinition.base == 'pointer' || typeDefinition.base == 'unsupported') {
        const node: NodeData = {
            id: memoryIndex,
            type: 'rect',
            style: {
                iconText: varValue,
                label: true,
                labelText: `${varName} @${memoryIndex}`.trim(),
                size: [256, 48],
            },
            data: {
                typeId,
            },
        };
        graphData.nodes?.push(node);
        createdNode[memoryIndex] = node;
        if (typeDefinition.base == 'pointer') {
            createNode(graphData, varValue as CNCRVarAddress, typeDefinition.targetTypeId);
            graphData.edges?.push({
                type: 'line',
                source: memoryIndex,
                target: `${varValue}:${typeDefinition.targetTypeId}`,
            });
        }
    } else if (typeDefinition.base == 'array') {
    } else if (typeDefinition.base == 'struct' || typeDefinition.base == 'union') {
    }
};

const renderStepData = () => {
    graphData = { nodes: [], edges: [], combos: [] };
    createdNode = {};
    for (const variable of currentStepData?.variables ?? []) {
        createNode(graphData, variable.address, variable.typeId, variable.name);
    }
    graph.setData(graphData);
    graph.render();
};
</script>
