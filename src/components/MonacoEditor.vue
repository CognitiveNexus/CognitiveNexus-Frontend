<!-- TODO: merge CodeEditor.vue -->

<template>
    <div ref="editorContainer" style="min-height: 500px"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { ElNotification } from 'element-plus';
import * as monaco from 'monaco-editor';
import loader from '@monaco-editor/loader';

const props = defineProps({
    modelValue: String,
    disabled: Boolean,
    highlightLine: Number,
});

const emit = defineEmits(['update:modelValue']);

const editorContainer = ref<HTMLElement>();
let editorInstance: monaco.editor.IStandaloneCodeEditor;
let resizeObserver: ResizeObserver;

onMounted(() => {
    loader.init().then((monaco) => {
        if (editorContainer.value == undefined) {
            throw 'Monaco editor container not found.';
        }
        editorInstance = monaco.editor.create(editorContainer.value, {
            value: props.modelValue || '',
            language: 'c',
            theme: 'vs-dark',
            readOnly: props.disabled,
            cursorStyle: props.disabled ? 'block-outline' : 'line',
            cursorBlinking: props.disabled ? 'solid' : 'smooth',
        }) as unknown as monaco.editor.IStandaloneCodeEditor;

        editorInstance.onDidChangeModelContent(() => {
            emit('update:modelValue', editorInstance.getValue());
        });

        if (props.highlightLine) {
            highlightLine(props.highlightLine);
        }

        resizeObserver = new ResizeObserver(() => {
            editorInstance.layout();
        });
        resizeObserver.observe(editorContainer.value);

        // 监听用户输入事件
        editorInstance.onDidAttemptReadOnlyEdit((_) => {
            ElNotification({
                title: '无法编辑',
                message: '程序正在运行中，请停止运行后再编辑。',
                type: 'info',
            });
        });
    });
});

onBeforeUnmount(() => {
    if (resizeObserver && editorContainer.value) {
        resizeObserver.unobserve(editorContainer.value);
    }
});

watch(
    () => props.modelValue,
    (newValue) => {
        if (editorInstance && editorInstance.getValue() !== newValue) {
            editorInstance.setValue(newValue ?? '');
        }
    }
);

watch(
    () => props.disabled,
    (newValue) => {
        if (editorInstance) {
            editorInstance.updateOptions({
                readOnly: newValue,
                cursorStyle: newValue ? 'block-outline' : 'line',
                cursorBlinking: newValue ? 'solid' : 'smooth',
            });
        }
    }
);

watch(
    () => props.highlightLine,
    (newLine) => {
        if (editorInstance) {
            highlightLine(newLine);
        }
    }
);

function highlightLine(lineNumber: number | undefined) {
    if (editorInstance) {
        editorInstance.getModel()?.deltaDecorations(
            editorInstance
                .getModel()
                ?.getAllDecorations()
                .map((d: monaco.editor.IModelDecoration) => d.id) || [],
            []
        );
        if (lineNumber) {
            editorInstance.getModel()?.deltaDecorations(
                [],
                [
                    {
                        range: new monaco.Range(lineNumber, 1, lineNumber, 1),
                        options: { isWholeLine: true, className: 'highlight-line' },
                    },
                ]
            );
            editorInstance.revealLineInCenter(lineNumber);
        }
    }
}
</script>

<style>
.highlight-line {
    background-color: rgba(87, 220, 87, 0.1);
}
</style>
