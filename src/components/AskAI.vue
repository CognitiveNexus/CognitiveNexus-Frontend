<template>
  <el-drawer :model-value="modelValue" @update:model-value="updateModelValue" title="问问 AI" direction="rtl" footer-class="no-padding">
    <template v-for="msg in history">
      <div class="message-container">
        <el-avatar :icon="msg.role == 'user' ? Avatar : Management" :size="30" />
        <el-text size="large">
          {{ msg.role == 'user' ? username ?? '您' : 'AI 导师' }}
        </el-text>
      </div>
      <el-text><vue-markdown :source="msg.content" /></el-text>
    </template>
    <template #footer>
      <div class="input-container">
        <el-input v-model="message" :autosize="{ minRows: 2, maxRows: 6 }" type="textarea" resize="none" placeholder="输入你的问题…" />
        <div class="input-action">
          <el-select v-model="selectedModel" placeholder="选择模型">
            <el-option v-for="model in models" :key="model.model" :label="model.name" :value="model.model" />
          </el-select>
          <el-button @click="ask" type="primary" :disabled="requesting">发送</el-button>
        </div>
      </div>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/Auth';
import { ElNotification } from 'element-plus';
import VueMarkdown from 'vue-markdown-render';
import { Avatar, Management } from '@element-plus/icons-vue';

const authStore = useAuthStore();
const { token, username, isAuthenticated, showLoginDialog } = storeToRefs(authStore);

const models = [
  { name: 'DeepSeek', model: 'deepseek-chat' },
  { name: 'DeepSeek 推理', model: 'deepseek-reasoner' },
];
const selectedModel = ref<string>('deepseek-chat');

const message = ref<string>('');
const history = ref<{ role: string; content: string }[]>([]);
const requesting = ref<boolean>(false);

const ask = async () => {
  if (!isAuthenticated.value) {
    showLoginDialog.value = true;
    return;
  }

  requesting.value = true;
  history.value.push({ role: 'user', content: message.value });
  message.value = '';
  const host = import.meta.env.COGNEX_API_HOST ?? '';
  const endpoint = `${host}/api/ask-ai/${selectedModel.value}`;

  fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: token.value!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages: history.value }),
  })
    .then(async (response) => {
      if (!response.body) throw new Error('请求结果空');
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      let { value, done } = await reader.read();
      const chunk = decoder.decode(value, { stream: true });
      const status = JSON.parse(chunk);
      if (status.error) {
        throw new Error(status.error);
      }

      history.value.push({ role: 'assistant', content: '' });
      while (!done) {
        ({ value, done } = await reader.read());
        const chunk = decoder.decode(value, { stream: true });
        history.value.at(-1)!.content += chunk;
      }
    })
    .catch((error: Error) => {
      ElNotification({ title: '请求失败', message: (error as Error).message, type: 'error' });
    })
    .finally(() => {
      requesting.value = false;
    });
};
const { modelValue } = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue']);
const updateModelValue = (value: boolean) => {
  emit('update:modelValue', value);
};
</script>
<style scoped>
* {
  white-space: pre-line;
}
::v-deep(.el-drawer__body) {
  padding: 0 !important;
}
.message-container {
  display: flex;
  align-items: center;
  gap: 8px;
}
.input-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid #e0e0e0;
}
.input-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
</style>
<style>
.no-padding {
  padding: 0 !important;
}
</style>
