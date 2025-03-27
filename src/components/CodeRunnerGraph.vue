<template>
    <div ref="graphContainer"></div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { Graph, type ComboData, type EdgeData, type GraphData, type IElementEvent, type NodeData, type NodeLikeData } from '@antv/g6';
import type { CNCRMemoryIndex, CNCRStep, CNCRTypeDefinitions, CNCRVar, CNCRVarAddress } from '@/types/CodeRunnerTypes';
import PromiseTask, { TaskCancelledError } from '@/utils/PromiseTask';

const { currentStepData, typeDefinitions } = defineProps<{
    currentStepData: CNCRStep;
    typeDefinitions: CNCRTypeDefinitions;
}>();

let graph: Graph;
const graphContainer = ref<HTMLElement>();

const graphRenderTask = new PromiseTask();

onMounted(() => {
    graph = new Graph({
        container: graphContainer.value,
        autoResize: true,
        zoom: 1.5,
        zoomRange: [0.1, 2],
        x: 400,
        y: 200,
        data: {},
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
                badgePalette: ['#424242'],
                label: true,
                labelFontSize: 8,
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
        combo: {
            style: {
                label: true,
                labelOffsetY: 4,
                labelFontSize: 8,
                labelBackground: true,
                labelBackgroundFill: '#FFFFFF',
            },
        },
    });
    graphRenderTask.add(async () => graph.render());
    watch(() => currentStepData, renderStepData);
});

type VarTree = {
    [memoryIndex: string]: VarNode;
};
type VarNode = { memoryIndex: CNCRMemoryIndex; varInfo: CNCRVar; children: VarTree; parent?: VarNode };
type NodeMap = { [memoryIndex: CNCRMemoryIndex]: VarNode };
const elementPadding = 50;

let graphData: GraphData = { nodes: [], edges: [], combos: [] };
let rootNodes: VarNode[] = [];
let nodeMap: NodeMap = {};
let varNameMap: { [memoryIndex: CNCRMemoryIndex]: string } = {};

const buildVarTree = (variable: CNCRVar, parent?: VarNode) => {
    const memoryIndex: CNCRMemoryIndex = `${variable.address}:${variable.typeId}`;
    const type = typeDefinitions[variable.typeId];
    if (varNameMap[memoryIndex]) variable.name = varNameMap[memoryIndex];
    let varNode: VarNode;
    if ((varNode = nodeMap[memoryIndex])) {
        if (parent && !varNode.parent) {
            parent.children[memoryIndex] = varNode;
            rootNodes.splice(
                rootNodes.findIndex((element) => element == varNode),
                1
            );
        }
    } else {
        varNode = { varInfo: variable, children: {}, memoryIndex, parent };
        nodeMap[memoryIndex] = varNode;
        if (parent) {
            parent.children[memoryIndex] = varNode;
        } else {
            rootNodes.push(varNode);
        }

        if (type.base == 'struct' || type.base == 'union') {
            const children = type.fields;
            for (const childName in children) {
                const childTypeId = children[childName].typeId;
                const childOffset = children[childName]?.offset ?? 0;
                const childAddress: CNCRVarAddress = ('0x' + (parseInt(variable.address) + childOffset).toString(16)) as CNCRVarAddress;
                buildVarTree({ name: `${variable.name ?? ''}.${childName}`, typeId: childTypeId, address: childAddress }, varNode);
            }
        } else if (type.base == 'array') {
            const childType = typeDefinitions[type.elementTypeId];
            for (let i = 0; i < type.length; i++) {
                const childAddress: CNCRVarAddress = ('0x' + (parseInt(variable.address) + i * childType.size).toString(16)) as CNCRVarAddress;
                buildVarTree({ name: `${variable.name ?? ''}[${i}]`, typeId: type.elementTypeId, address: childAddress }, varNode);
            }
        } else if (type.base == 'pointer') {
            const targetAddress: CNCRVarAddress = currentStepData.memory[memoryIndex]?.value as CNCRVarAddress;
            if (targetAddress && targetAddress != 'NULL' && targetAddress != 'N/A') {
                buildVarTree({ name: '', typeId: type.targetTypeId, address: targetAddress });
            }
        }
    }
};

const buildNode = (varNode: VarNode, baseX: number, baseY: number, combo?: string): { nodeWidth: number; nodeHeight: number } => {
    let nodeWidth = 0,
        nodeHeight = 0;
    if (varNode.varInfo.address == 'NULL' || varNode.varInfo.address == 'N/A') {
        return { nodeWidth, nodeHeight };
    }
    const { address, typeId, name: varName } = varNode.varInfo;
    const memoryIndex: CNCRMemoryIndex = `${varNode.varInfo.address}:${varNode.varInfo.typeId}`;
    const nodeData: NodeLikeData = { id: memoryIndex, type: 'rect' };
    const type = typeDefinitions[varNode.varInfo.typeId];
    const isBasicNode = type.base == 'atomic' || type.base == 'pointer' || type.base == 'unsupported';
    const isPointer = type.base == 'pointer';
    let varValue, rawBytes;
    if (combo) nodeData.combo = combo;

    if (isBasicNode) {
        nodeWidth = 144;
        nodeHeight = 32;
        ({ value: varValue, rawBytes } = currentStepData.memory[memoryIndex]);
        nodeData.data = { address, typeId, varValue, rawBytes };
        nodeData.style = {
            iconText: varValue,
            labelText: memoryIndex,
            badges: [{ text: varName, placement: 'top-left' }],
            size: [nodeWidth, nodeHeight],
            x: baseX,
            y: baseY,
        };
        if (type.base == 'pointer') nodeData.style.fill = '#936956';
    } else {
        nodeData.style = {
            labelText: memoryIndex,
        };
        for (const childMemoryIndex in varNode.children) {
            const childNode = varNode.children[childMemoryIndex];
            const { nodeWidth: dWidth, nodeHeight: dHeight } = buildNode(childNode, baseX + nodeWidth + elementPadding, baseY, memoryIndex);
            nodeWidth += dWidth + elementPadding;
            if (dHeight > nodeHeight) nodeHeight = dHeight;
        }
    }

    graphData[isBasicNode ? 'nodes' : 'combos']?.push(nodeData);
    if (isPointer && varValue != 'NULL' && varValue != 'N/A') {
        graphData.edges?.push({
            type: 'line',
            source: memoryIndex,
            target: `${varValue}:${type.targetTypeId}`,
        });
    }
    return { nodeWidth, nodeHeight };
};

const renderStepData = () => {
    if (!Object.keys(currentStepData).length) {
        graphRenderTask
            .add(async () => graph.clear())
            .catch((error: Error) => {
                if (!(error instanceof TaskCancelledError)) {
                    throw error;
                }
            });
        return;
    }
    graphData = { nodes: [], edges: [], combos: [] };
    rootNodes = [];
    nodeMap = {};
    varNameMap = {};

    for (const variable of currentStepData.variables) {
        varNameMap[`${variable.address}:${variable.typeId}`] = variable.name;
    }
    for (const variable of currentStepData.variables) {
        buildVarTree(variable);
    }

    let globalY = 0;
    for (const rootNode of rootNodes) {
        const { nodeHeight } = buildNode(rootNode, 0, globalY);
        globalY += nodeHeight + elementPadding;
    }

    graphRenderTask
        .add(async () => {
            graph.setData(graphData);
            await graph.render();
        })
        .catch((error: Error) => {
            if (!(error instanceof TaskCancelledError)) {
                throw error;
            }
        });
};
</script>
