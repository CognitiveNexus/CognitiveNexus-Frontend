<template>
    <div ref="editorContainer" style="min-height: 500px"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
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
            editorInstance.updateOptions({ readOnly: newValue });
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
        }
    }
}
</script>

<style>
.highlight-line {
    background-color: rgba(87, 220, 87, 0.1);
}
</style>
