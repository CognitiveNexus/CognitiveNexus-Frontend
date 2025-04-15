<template>
  <el-drawer :model-value="modelValue" @update:model-value="updateModelValue" direction="rtl" body-class="no-padding" footer-class="no-padding">
    <template #header>
      小论坛&emsp;
      <el-text type="info">{{ currentChapter }}</el-text>
    </template>
    <div class="comment-display">
      <el-empty v-if="!comments.length" description="暂无评论" />
      <template v-else>
        <el-select v-model="sortOrder">
          <el-option v-for="(name, value) of sortOrders" :label="name" :value="value" />
        </el-select>
        <el-card v-for="comment in sortedComments" :key="comment.id" class="comment-card">
          <template #header>
            <div class="comment-header">
              <el-avatar :icon="Avatar" :size="30" />{{ comment.username }}
              <div class="spacer"></div>
              <el-text type="info">{{ comment.createdAt.toLocaleString('zh-CN') }}</el-text>
            </div>
          </template>
          <el-text class="comment-content">
            {{ comment.content }}
          </el-text>
          <template #footer>
            <div class="comment-footer">
              <el-button :icon="CaretTop" :type="comment.ownRate > 0 ? 'primary' : 'default'" @click="sendLike(comment.id, 1)" text bg />
              <el-text>{{ comment.totalLikes }}</el-text>
              <el-button :icon="CaretBottom" :type="comment.ownRate < 0 ? 'primary' : 'default'" @click="sendLike(comment.id, -1)" text bg />
              <el-button :icon="Remove" @click="sendLike(comment.id, 0)" text bg />
            </div>
          </template>
        </el-card>
      </template>
    </div>
    <template #footer>
      <div class="comment-send">
        <el-input v-model="commentText" :disabled="sending" :rows="5" type="textarea" resize="none" placeholder="输入你的想法…" @keydown="handleKeyDown" />
        <el-button type="primary" :disabled="sending || !commentText" @click="sendComment()">发送</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { Avatar, CaretTop, CaretBottom, Remove } from '@element-plus/icons-vue';
import { getComments, addComment, likeComment, type Comment, type CommentRate } from '@/utils/Comments';
import { useAuthStore } from '@/stores/Auth';
import { useCourseStore } from '@/stores/Course';
import { ElMessage } from 'element-plus';

const { modelValue } = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue']);
const updateModelValue = (value: boolean) => {
  emit('update:modelValue', value);
};

const comments = ref<Comment[]>([]);
const commentText = ref<string>('');
const sending = ref<boolean>(false);

const { courseName, currentChapter } = storeToRefs(useCourseStore());
const commentLocation = computed<string | null>(() =>
  courseName.value !== null && currentChapter.value !== null ? `${courseName.value}@${currentChapter.value}` : null
);

const sortOrders = {
  likeDesc: '高赞优先',
  timeDesc: '最新优先',
  timeAsc: '最旧优先',
};
const sortOrder = ref<keyof typeof sortOrders>('likeDesc');
const sortedComments = computed(() =>
  comments.value.sort((a, b) => {
    if (sortOrder.value === 'likeDesc') {
      return b.totalLikes - a.totalLikes;
    } else if (sortOrder.value === 'timeDesc') {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else {
      return a.createdAt.getTime() - b.createdAt.getTime();
    }
  })
);

const handleKeyDown = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key == 'Enter') {
    if (sending.value) {
      ElMessage({
        message: '请稍后再发送',
        type: 'warning',
        plain: true,
      });
      return;
    }
    sendComment();
  }
};

const updateComments = async () => {
  if (!commentLocation.value) comments.value = [];
  else comments.value = await getComments(commentLocation.value);
};

const sendLike = async (commentId: number, rate: CommentRate) => {
  if (!commentLocation.value) return;
  if (await likeComment(commentLocation.value, commentId, rate)) {
    await updateComments();
    ElMessage({
      message: '操作成功',
      type: 'success',
    });
  }
};

const sendComment = async () => {
  if (!commentLocation.value) return;
  if (!commentText.value) {
    ElMessage({
      message: '评论不能为空',
      type: 'warning',
    });
    return;
  }
  sending.value = true;
  try {
    if (await addComment(commentLocation.value, commentText.value)) {
      await updateComments();
      commentText.value = '';
      ElMessage({
        message: '操作成功',
        type: 'success',
      });
    }
  } finally {
    sending.value = false;
  }
};

const { isAuthenticated } = storeToRefs(useAuthStore());
watch(isAuthenticated, (isNowAuthenticated) => {
  isNowAuthenticated ? updateComments() : (comments.value = []);
});

watch(commentLocation, updateComments);
onMounted(updateComments);
</script>
<style scoped>
.comment-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 48em;
  margin: 0 auto;
}
.comment-send {
  padding-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 12px;
  border-top: 1px solid #e0e0e0;
}
.comment-display {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 0 12px 24px;
}
.comment-card {
  width: 100%;
}
.comment-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.comment-content {
  white-space: pre-line;
}
.comment-footer {
  display: flex;
  align-items: center;
  gap: 8px;
}
.spacer {
  flex: 1;
}
</style>
<style>
.no-padding {
  padding: 0 !important;
}
</style>
