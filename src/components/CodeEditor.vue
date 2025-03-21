<template>
  <el-container>
    <el-header class="top-bar">

      <!-- 主题选择 开始 -->
      <el-text>
        <el-icon :size="20" :color="'#409EFF'">
          <Brush />
        </el-icon>主题
      </el-text>
      <el-select v-model="theme" style="width: 140px;">
        <el-option v-for="item in themes" :key="item.label" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <!-- 主题选择 结束 -->

      <!-- 字体调整 开始 -->
      <el-text>
        <el-icon :size="20" :color="'#409EFF'">
          <Reading />
        </el-icon>字体
      </el-text>
      <el-select v-model="fontSize" placeholder="中" style="width: 100px;">
        <el-option v-for="item in fontSizes" :key="item.label" :label="item.label" :value="item.value">
        </el-option>
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
            <span style="float: left;font-weight: 600;">{{ tip.operate }}</span>
            <span style="float: right;">{{ tip.description }}</span>
            <br>
          </div>
        </el-popover>
        <!-- 使用提示 结束 -->

        <!-- 清空界面 开始 -->
        <el-popconfirm title="确定要删除所有内容吗？" confirm-button-text="是" cancel-button-text="否" placement="top"
          @confirm=clearEditor()>
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
    <el-footer>

    </el-footer>
  </el-container>
</template>

<script setup lang="ts" name="CodeEditor">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import * as monaco from "monaco-editor";

const props = defineProps({
  code: {
    type: String,
    default: `#include <stdio.h>
    
int main(){
  printf("Hello World.");
  return 0;
}`
  },
  language: {
    type: String,
    default: "c"
  },
  theme: {
    type: String,
    default: "vs-dark"
  }
});

const theme = ref("VSCode Dark");
const themes = [
  {
    label: "VSCode Dark",
    value: "vs-dark"
  },
  {
    label: "VSCode Light",
    value: "vs"
  }
]

const fontSize = ref();
const fontSizes = [
  {
    label: "小",
    value: "12"
  },
  {
    label: "中",
    value: "18"
  },
  {
    label: "大",
    value: "24"
  },
  {
    label: "特大",
    value: "30"
  }
]

const tips = [
  {
    operate: "Ctrl + [",
    description: "向左缩进"
  },
  {
    operate: "Ctrl + ]",
    description: "向右缩进"
  },
  {
    operate: "Ctrl + /",
    description: "行注释"
  },
  {
    operate: "Ctrl + X",
    description: "剪切"
  },
  {
    operate: "Ctrl + Z",
    description: "撤销"
  }
]

const emit = defineEmits(['update:code']);
const container = ref();
let editor: monaco.editor.IStandaloneCodeEditor;

// 初始化编辑器
onMounted(() => {
  editor = monaco.editor.create(container.value, {
    value: props.code,
    language: props.language,
    theme: props.theme,
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: 18,
    lineNumbers: 'on',
    scrollBeyondLastLine: false
  });

  // 监听内容变化
  editor.onDidChangeModelContent(() => {
    emit('update:code', editor.getValue());
  });
});

//清空code editor
function clearEditor() {
  editor.setValue('');
}

//监视主题序号变化
watch(theme, (new_theme) => {
  monaco.editor.setTheme(new_theme);
})

//监视主题字体变化
watch(fontSize, (new_size) => {
  editor.updateOptions({ fontSize: new_size });
})

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
.top-bar > *{
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
.toolbox{
  display: flex;
  gap: 8px;
  margin-left: auto;
}
.el-button{
  position: static;
}
.el-container{
  overflow: hidden;
}
.editor-container {
  width: 100%;
  height: 100%;
}
</style>