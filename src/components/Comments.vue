<template>
  <div class="comment-container">
    <div class="comment-send">
      <el-input v-model="commentText" :disabled="sending" rows="5" type="textarea" resize="none" placeholder="输入你的想法…" />
      <el-button type="primary" :disabled="sending" @click="sendComment()">发送</el-button>
    </div>
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
              <el-button :icon="Remove" :type="comment.ownRate < 0 ? 'primary' : 'default'" @click="sendLike(comment.id, 0)" text bg />
            </div>
          </template>
        </el-card>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { Avatar, CaretTop, CaretBottom, Remove } from '@element-plus/icons-vue';
import { getComments, addComment, likeComment, type Comment, type CommentRate } from '@/utils/Comments';
import { useAuthStore } from '@/stores/Auth';
import { ElMessage } from 'element-plus';

const { courseName } = defineProps<{ courseName: string }>();
const comments = ref<Comment[]>([
  {
    username: '11',
    id: 1,
    content: 'ccc',
    createdAt: new Date(),
    totalLikes: 0,
    ownRate: 0,
  },
]);
const commentText = ref<string>('');
const sending = ref<boolean>(false);

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

const updateComments = async () => {
  comments.value = await getComments(courseName);
};

const sendLike = async (commentId: number, rate: CommentRate) => {
  if (await likeComment(courseName, commentId, rate)) {
    await updateComments();
    ElMessage({
      message: '操作成功',
      type: 'success',
    });
  }
};

const sendComment = async () => {
  sending.value = true;
  try {
    if (await addComment(courseName, commentText.value)) {
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

onMounted(updateComments);
</script>
<style scoped>
.comment-send {
  padding: 24px;
  padding-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid #e0e0e0;
  width: 100%;
}
.comment-display {
  padding: 24px;
  padding-top: none;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  width: 100%;
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
.comment-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.spacer {
  flex: 1;
}
</style>
