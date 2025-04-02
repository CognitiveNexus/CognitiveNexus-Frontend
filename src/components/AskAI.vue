<template>
  <el-drawer :model-value="modelValue" @update:model-value="updateModelValue" title="问问 AI" direction="rtl">
    <template v-for="msg in history">
      <el-text :type="msg.role == 'user' ? 'primary' : 'success'">{{ msg.role }}：{{ msg.content }}</el-text>
      <br />
    </template>
    <el-input v-model="chat" :rows="10" type="textarea" placeholder="Please input" />
    <el-button @click="ask" type="primary">问！</el-button>
  </el-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/Auth';
import { ElNotification } from 'element-plus';

const authStore = useAuthStore();
const { token, isAuthenticated, showLoginDialog } = storeToRefs(authStore);

const chat = ref<string>('');
const model = 'deepseek-chat';
const history = ref<{ role: string; content: string }[]>([]);
const ask = async () => {
  if (!isAuthenticated.value) {
    showLoginDialog.value = true;
    return;
  }

  history.value.push({ role: 'user', content: chat.value });
  chat.value = '';
  const host = import.meta.env.COGNEX_API_HOST ?? '';
  const endpoint = `${host}/api/ask-ai/${model}`;

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
</style>
