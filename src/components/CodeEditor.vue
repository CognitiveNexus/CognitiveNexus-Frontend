<template>
    <el-container>
        <el-header class="top-bar">
            <!-- 主题选择 开始 -->
            <el-text>
                <el-icon :size="20" :color="'#409EFF'"> <Brush /> </el-icon>主题
            </el-text>
            <el-select v-model="theme" style="width: 140px">
                <el-option v-for="item in themes" :key="item.label" :label="item.label" :value="item.value"> </el-option>
            </el-select>
            <!-- 主题选择 结束 -->

            <!-- 字体调整 开始 -->
            <el-text>
                <el-icon :size="20" :color="'#409EFF'"> <Reading /> </el-icon>字体
            </el-text>
            <el-select v-model="fontSize" placeholder="中" style="width: 100px">
                <el-option v-for="item in fontSizes" :key="item.label" :label="item.label" :value="item.value"> </el-option>
            </el-select>
            <!-- 字体调整 结束 -->

            <div class="toolbox">
                <!-- 使用提示 开始 -->
                <el-popover title="键盘快捷键" placement="top" :width="200" trigger="hover">
                    <template #reference>
                        <el-button circle>
                            <el-icon :size="20">
                                <InfoFilled />
                            </el-icon>
                        </el-button>
                    </template>
                    <div v-for="tip in tips">
                        <span style="float: left; font-weight: 600">{{ tip.operate }}</span>
                        <span style="float: right">{{ tip.description }}</span>
                        <br />
                    </div>
                </el-popover>
                <!-- 使用提示 结束 -->

                <!-- 清空界面 开始 -->
                <el-popconfirm title="确定要删除所有内容吗？" confirm-button-text="是" cancel-button-text="否" placement="top" @confirm="clearEditor()">
                    <template #reference>
                        <el-button circle>
                            <el-icon :size="20">
                                <Refresh />
                            </el-icon>
                        </el-button>
                    </template>
                </el-popconfirm>
                <!-- 清空界面 结束 -->
            </div>
        </el-header>
        <div ref="container" class="editor-container"></div>
        <el-footer> </el-footer>
    </el-container>
</template>

<script setup lang="ts" name="CodeEditor">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { ElNotification } from 'element-plus';
import * as monaco from 'monaco-editor';

const props = defineProps({
    modelValue: {
        type: String,
        default: '#include <stdio.h>\n\nint main(){\n    printf("Hello, world!");\n    return 0;\n}',
    },
    language: {
        type: String,
        default: 'c',
    },
    theme: {
        type: String,
        default: 'vs-dark',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    highlightLine: {
        type: Number,
    },
});
const emit = defineEmits(['update:modelValue']);

const theme = ref<string>('VSCode Dark');
const themes = [
    { label: 'VSCode Dark', value: 'vs-dark' },
    { label: 'VSCode Light', value: 'vs' },
];

const fontSize = ref<string>();
const fontSizes = [
    { label: '小', value: '12' },
    { label: '中', value: '14' },
    { label: '大', value: '18' },
    { label: '特大', value: '24' },
];

const tips = [
    { operate: 'Ctrl + [', description: '向左缩进' },
    { operate: 'Ctrl + ]', description: '向右缩进' },
    { operate: 'Ctrl + /', description: '行注释' },
    { operate: 'Ctrl + X', description: '剪切' },
    { operate: 'Ctrl + Z', description: '撤销' },
];

const container = ref<HTMLElement>();
let editor: monaco.editor.IStandaloneCodeEditor;
let resizeObserver: ResizeObserver;

// 初始化编辑器
onMounted(() => {
    if (container.value === undefined) {
        throw new Error('Code editor container div not found.');
    }
    editor = monaco.editor.create(container.value, {
        value: props.modelValue,
        language: props.language,
        theme: props.theme,
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 18,
        lineNumbers: 'on',
        readOnly: props.disabled,
        cursorStyle: props.disabled ? 'block-outline' : 'line',
        cursorBlinking: props.disabled ? 'solid' : 'smooth',
    });

    if (props.highlightLine) {
        highlightLine(props.highlightLine);
    }

    resizeObserver = new ResizeObserver(() => {
        editor.layout();
    });
    resizeObserver.observe(container.value);

    // 监听内容变化
    editor.onDidChangeModelContent(() => {
        emit('update:modelValue', editor.getValue());
    });

    // 监听只读时修改失败
    editor.onDidAttemptReadOnlyEdit(() => {
        readonlyPrompt();
    });
});

// 清空编辑器
function clearEditor() {
    editor.setValue('');
}

// 高亮行
function highlightLine(lineNumber: number | undefined) {
    editor.getModel()?.deltaDecorations(
        editor
            .getModel()
            ?.getAllDecorations()
            .map((d: monaco.editor.IModelDecoration) => d.id) || [],
        []
    );
    if (lineNumber) {
        editor.getModel()?.deltaDecorations(
            [],
            [
                {
                    range: new monaco.Range(lineNumber, 1, lineNumber, 1),
                    options: { isWholeLine: true, className: 'highlight-line' },
                },
            ]
        );
        editor.revealLineInCenter(lineNumber);
    }
}

function readonlyPrompt() {
    ElNotification({
        title: '无法编辑',
        message: '程序正在运行中，请停止运行后再编辑。',
        type: 'info',
    });
}

// 监视高亮行
watch(
    () => props.highlightLine,
    (newLine) => {
        highlightLine(newLine);
    }
);

// 监视禁用
watch(
    () => props.disabled,
    (newValue) => {
        editor.updateOptions({
            readOnly: newValue,
            cursorStyle: newValue ? 'block-outline' : 'line',
            cursorBlinking: newValue ? 'solid' : 'smooth',
        });
    }
);

// 监视 v-model
watch(
    () => props.modelValue,
    (newValue) => {
        if (editor.getValue() !== newValue) {
            editor.setValue(newValue ?? '');
        }
    }
);

// 监视主题序号变化
watch(theme, (new_theme) => {
    monaco.editor.setTheme(new_theme);
});

// 监视主题字体变化
watch(fontSize, (new_size) => {
    editor.updateOptions({ fontSize: parseInt(new_size ?? '14') });
});

// 清理资源
onBeforeUnmount(() => {
    if (editor) editor.dispose();
});
</script>

<style scoped>
.top-bar {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 10px;
}
.top-bar > * {
    flex-shrink: 0;
}
.el-select {
    margin-right: 0;
    position: static;
}
.el-text {
    display: inline-flex;
    text-align: center;
    justify-content: center;
    user-select: none;
}
.toolbox {
    display: flex;
    gap: 8px;
    margin-left: auto;
}
.el-button {
    position: static;
}
.el-container {
    overflow: hidden;
}
.editor-container {
    width: 100%;
    height: 100%;
}
</style>

<style>
.highlight-line {
    background-color: rgba(87, 220, 87, 0.1);
}
</style>
