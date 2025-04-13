<template>
  <el-scrollbar class="reader-container" height="700px">
    <div v-for="item in contents">
      <el-text v-if="item.type === 'title'" class="title">{{ item.content }}</el-text>

      <div v-else-if="item.type === 'tag'" class="tag">
        <el-text>前置知识点：</el-text>
        <el-tag v-for="tag in item.tags" :type="tag.type" :effect="tag.effect" :size="tag.size">{{ tag.text }}</el-tag>
      </div>

      <MdPreview v-else-if="item.type === 'text'" :modelValue="item.content" previewTheme="github" class="text" />

      <div class="warp-button" v-else-if="item.type === 'button'">
        <el-button
          v-for="button in item.buttons"
          :type="button.requireSolved && !solved ? 'info' : button.type"
          :size="button.size"
          :icon="Flag"
          @click="handleClick(button.targetIndex, button.relative, button.requireSolved)"
          >{{ button.text }}
        </el-button>
      </div>

      <div class="visualizer" v-else-if="item.type === 'visualization'">
        <ColumnChart />
        <Log />
      </div>

      <div class="video-container" v-else-if="item.type === 'video'">
        <iframe
          v-if="item.platform === 'bilibili'"
          :src="`//player.bilibili.com/player.html?bvid=${item.link}&autoplay=true&danmaku=false`"
          scrolling="no"
          frameborder="no"
          framespacing="0"
          allowfullscreen="true"
          class="video-player"
        ></iframe>
        <video v-if="item.platform === 'local'" :src="item.link" class="video-player" controls></video>
      </div>

      <div class="video-container" v-else-if="item.type === 'slideshow'">
        <iframe
          :src="`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(`${origin}/static/${item.filename}`)}`"
          class="video-player"></iframe>
      </div>

      <Confetti v-else-if="item.type === 'congratulation'" class="absolute left-0 top-0 z-0 size-full no-pointer-events" style="pointer-events: none" />
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts" name="ContentRender">
import { ElMessage, ElMessageBox } from 'element-plus';
import { MdPreview } from 'md-editor-v3';
import { Flag } from '@element-plus/icons-vue';
import type { StoryContent } from '@/types/CourseTypes';

const { contents, solved } = defineProps<{
  contents: StoryContent[];
  solved?: boolean;
}>();
const emit = defineEmits(['goto']);
const origin = window.location.origin;

const handleClick = async (targetIndex: number, relative?: boolean, requireSolved?: boolean) => {
  if (requireSolved && !solved) {
    try {
      await ElMessageBox.confirm('你还没有解决当前难题！确认前往下一步吗？', '确认前进', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      });
    } catch (err) {
      return;
    }
  }
  emit('goto', targetIndex, relative);
};
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
.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  position: relative;
  margin: 24px 0;
}

.video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border: none;
}

.text {
  background-color: #ffffff00;
}
</style>
