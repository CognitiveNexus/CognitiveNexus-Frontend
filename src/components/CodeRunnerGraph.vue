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
            style: {
                iconFontSize: 16,
                labelFontSize: 8,
                badgePalette: ['#424242'],
                size: [144, 32],
            },
        },
        edge: {
            style: {
                startArrow: false,
                endArrow: true,
                stroke: '#4C4C4C',
            },
        },
    });
    graph.render();
    watch(() => currentStepData, renderStepData);
});

const createNode = (graphData: GraphData, address: CNCRVarAddress, typeId: CNCRVarTypeId, varName?: string) => {
    const typeDefinition = typeDefinitions[typeId];
    const memoryIndex: CNCRMemoryIndex = `${address}:${typeId}`;
    const varValue = currentStepData.memory[memoryIndex]?.value ?? '???';
    if (createdNode[memoryIndex]) {
        const style = createdNode[memoryIndex].style ?? {};
        if (varName && style.badge) {
            style.badge = true;
            style.badges = [{ text: varName, placement: 'top-left' }];
        }
        return;
    }
    if (typeDefinition.base == 'atomic' || typeDefinition.base == 'pointer' || typeDefinition.base == 'unsupported') {
        const node: NodeData = {
            id: memoryIndex,
            type: 'rect',
            style: {
                iconText: varValue,
                label: true,
                labelText: memoryIndex,
            },
            data: {
                typeId,
            },
        };
        if (varName) {
            const style = node.style ?? {};
            style.badge = true;
            style.badges = [{ text: varName, placement: 'top-left' }];
        }
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
