<template>
    <div ref="graphContainer"></div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { Graph, type ComboData, type EdgeData, type GraphData, type IElementEvent, type NodeData } from '@antv/g6';
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
        zoom: 1.5,
        zoomRange: [0.1, 2],
        data: {},
        layout: {
            type: 'force',
        },
        animation: {
            duration: 500,
        },
        plugins: [
            {
                type: 'grid-line',
                size: 50,
            },
            {
                type: 'tooltip',
                enable: (event: IElementEvent, _: (NodeData | EdgeData | ComboData)[]) => {
                    return event.targetType == 'node';
                },
                getContent: (_: IElementEvent, items: (NodeData | EdgeData | ComboData)[]) => {
                    let result = '';
                    items.forEach((item) => {
                        result += '<div>';
                        result += `<b>地址：</b>${item?.data?.address}<br />`;
                        result += `<b>类型：</b>${item?.data?.typeId}<br />`;
                        result += `<b>数值：</b>${item?.data?.varValue}<br />`;
                        result += `<b>原始：</b>${item?.data?.rawBytes}`;
                        result += '</div>';
                    });
                    return result;
                },
            },
        ],
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'focus-element'],
        node: {
            palette: {
                field: 'typeId',
            },
            style: {
                iconFontSize: 16,
                labelFontSize: 8,
                badgePalette: ['#424242'],
                size: [144, 32],
                label: true,
                labelBackground: true,
                labelBackgroundFill: '#FFFFFF',
            },
        },
        edge: {
            style: {
                startArrow: false,
                endArrow: true,
                endArrowType: 'vee',
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
    const rawBytes = currentStepData.memory[memoryIndex]?.rawBytes ?? '???';
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
            data: {
                address,
                typeId,
                varValue,
                rawBytes,
            },
        };
        node.style = {
            iconText: varValue,
            labelText: memoryIndex,
        };
        if (varName) {
            node.style.badge = true;
            node.style.badges = [{ text: varName, placement: 'top-left' }];
        }
        if (typeDefinition.base == 'pointer') {
            node.style.fill = '#936956';
        }
        graphData.nodes?.push(node);
        createdNode[memoryIndex] = node;
        if (typeDefinition.base == 'pointer' && varValue != 'NULL' && varValue != 'N/A') {
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
    if (!Object.keys(currentStepData).length) {
        graph.clear();
    }
    graphData = { nodes: [], edges: [], combos: [] };
    createdNode = {};
    for (const variable of currentStepData?.variables ?? []) {
        createNode(graphData, variable.address, variable.typeId, variable.name);
    }
    graph.setData(graphData);
    graph.render();
};
</script>
