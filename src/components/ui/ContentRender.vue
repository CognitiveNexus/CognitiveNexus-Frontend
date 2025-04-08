<template>
  <el-scrollbar class="reader-container" height="700px">
    <div v-for="item in content as ContentItem[] ">
      <el-text v-if="item.type === 'title'" class="title">{{ item.content }}</el-text>

      <div v-else-if="item.type === 'tag'" class="tag">
        <el-text>前置知识点：</el-text>
        <el-tag v-for="tag in item.content" :type="tag.tagtype" :effect="tag.effect" :size="tag.size">{{ tag.text }}</el-tag>
      </div>

      <MdPreview v-else-if="item.type === 'text'" :modelValue="item.content" />

      <div class="warp-button" v-else-if="item.type === 'button'">
        <el-button
          v-for="button in item.content"
          :type="actualButtonType(button.buttontype, button.ask)"
          :size="button.size"
          :icon="Flag"
          @click="handleClick(button.targetIndex, button.ask)"
          >{{ button.text }}
        </el-button>
      </div>

      <div class="visualizer" v-else-if="item.type === 'visualizer'">
        <ColumnChart />
        <Log />
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts" name="ContentRender">
import type { ContentItem } from '@/types/TextReaderTypes';
import { Flag } from '@element-plus/icons-vue';
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import type { elementType } from '@/types/TextReaderTypes';
import { ElMessage, ElMessageBox } from 'element-plus';

const { content, solved } = defineProps({
  content: {
    type: Array,
    required: true,
  },
  solved: Boolean,
});
console.log(solved);
const emit = defineEmits(['link']);

const actualButtonType = (buttontype: elementType, ask: boolean | undefined): elementType => {
  if (!ask || solved) return buttontype;
  return 'info';
};

function handleClick(targetIndex: number, ask: boolean | undefined) {
  if (!ask || solved) {
    emit('link', targetIndex);
    return;
  }
  ElMessageBox.confirm('你还没有解决当前难题！确认前往下一步吗？', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      ElMessage({
        type: 'info',
        message: '继续前进',
      });
      emit('link', targetIndex);
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '继续挑战',
      });
    });
}
</script>

<style scoped>
.title {
  width: auto;
  font-size: 40px;
  font-weight: 1000;
  margin-bottom: 10px;
  line-height: 3;
  padding: 18px 0px;
  border-bottom: 1px solid black;
  background-image: linear-gradient(90deg, #46a2ff, #9554ff);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.content {
  font-size: 18px;
  font-weight: 500;
  line-height: 2.2;
  letter-spacing: 1px;
  color: #3c3c43;
}
.highlight {
  font-size: 18px;
  font-weight: 500;
  line-height: 2.2;
  letter-spacing: 1px;
  background-color: #ececec;
  color: black;
  padding: 3px;
}
.tips {
  font-size: 18px;
  font-weight: 500;
  line-height: 2.2;
  letter-spacing: 1px;
  color: #3c3c43;
  background-color: rgb(216.8, 235.6, 255);
}
.code {
  background-color: #f6f8fa;
}
.tag {
  gap: 10px;
  margin-bottom: 10px;
}
.el-tag {
  margin-right: 10px;
}
.warp-button {
  margin-top: 50px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
}
.visualizer {
  margin: 10px 0px;
  display: flex;
  flex-direction: row;
}
</style>
