<template>
  <el-drawer :model-value="modelValue" @update:model-value="updateModelValue" direction="rtl" footer-class="no-padding">
    <template #header>
      <el-text size="large">AI 导师</el-text>
      <el-popconfirm title="确定重置会话？" placement="bottom-end" @confirm="resetHistory">
        <template #reference>
          <el-button :icon="Refresh" text round />
        </template>
      </el-popconfirm>
    </template>
    <el-empty v-if="!history.length" description="还没有问过问题哦" />
    <template v-for="msg in history">
      <div class="message-container">
        <el-avatar :icon="msg.role == 'user' ? Avatar : Management" :size="30" />
        <el-text size="large">
          {{ msg.role == 'user' ? username ?? '您' : 'AI 导师' }}
        </el-text>
      </div>
      <el-collapse v-if="msg.reasoning_content">
        <el-collapse-item title="思考过程">
          <pre>{{ msg.reasoning_content }}</pre>
        </el-collapse-item>
      </el-collapse>
      <el-text>
        <el-skeleton v-if="msg.loading && !msg.content" :rows="0" class="loading" animated />
        <vue-markdown :source="msg.content" />
      </el-text>
    </template>
    <template #footer>
      <div class="input-container">
        <el-input v-model="message" :autosize="{ minRows: 2, maxRows: 6 }" type="textarea" resize="none" placeholder="输入你的问题…" @keydown="handleKeyDown" />
        <div class="input-action">
          <el-select v-model="selectedModel" :disabled="requesting" placeholder="选择模型">
            <el-option v-for="model in models" :key="model.model" :label="model.name" :value="model.model" />
          </el-select>
          <el-checkbox v-model="askWithCode" :disabled="!code" label="包含当前代码" :border="true" checked />
          <el-tooltip content="按 Ctrl/Command + Enter 发送" placement="top-end" effect="light" :show-after="750">
            <el-button
              @click="requesting ? stop() : ask()"
              :type="requesting ? 'danger' : 'primary'"
              :disabled="requesting || !message.trim()"
              :plain="requesting"
              >{{ requesting ? '停止' : '发送' }}</el-button
            >
          </el-tooltip>
        </div>
      </div>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { ElNotification, ElMessage } from 'element-plus';
import VueMarkdown from 'vue-markdown-render';
import { Avatar, Management, Refresh } from '@element-plus/icons-vue';
import { useAuthStore } from '@/stores/Auth';
import { useCodeStore } from '@/stores/Code';

const authStore = useAuthStore();
const { token, username, isAuthenticated, showLoginDialog } = storeToRefs(authStore);
const codeStore = useCodeStore();
const { code } = storeToRefs(codeStore);

let models: { name: string; model: string }[] = [
  { name: 'DeepSeek-V3', model: 'deepseek-chat' },
  { name: 'DeepSeek-R1 深度思考', model: 'deepseek-reasoner' },
];
const selectedModel = ref<string>('deepseek-chat');
if (import.meta.env.MODE === 'development') {
  models.push({ name: '大模型模拟测试', model: 'test' });
  selectedModel.value = 'test';
}

const message = ref<string>('');
const askWithCode = ref<boolean>(true);
const history = ref<{ role: string; content: string; reasoning_content?: string; loading?: boolean }[]>([]);
const requesting = ref<boolean | string>(false);

const handleKeyDown = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key == 'Enter') {
    ask();
  }
};
const stop = async () => {};
const ask = async () => {
  if (!message.value) {
    ElMessage({
      message: '消息内容为空',
      type: 'warning',
      plain: true,
    });
    return;
  }
  if (!isAuthenticated.value) {
    ElMessage({
      message: '用户未登录',
      type: 'warning',
      plain: true,
    });
    showLoginDialog.value = true;
    return;
  }

  requesting.value = true;
  history.value.push({ role: 'user', content: message.value.trim() });
  message.value = '';
  const host = import.meta.env.COGNEX_API_HOST ?? '';
  const endpoint = `${host}/api/ask-ai/${selectedModel.value}`;
  history.value.push({ role: 'assistant', content: '', reasoning_content: '', loading: true });

  let body = {
    messages: history.value.slice(0, -1).map((value) => {
      return { role: value.role, content: value.content };
    }),
    code: askWithCode.value ? code.value : null,
  };

  fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: token.value!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(async (response) => {
      if (!response.body) throw new Error('请求结果空');
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      while (true) {
        let { value, done } = await reader.read();
        if (done) break;

        for (const chunk of decoder.decode(value, { stream: true }).split('\n\n')) {
          if (!chunk.trim().length) continue;
          const result = JSON.parse(chunk);
          if (result.error) throw new Error(result.error);
          if (result.content) {
            history.value.at(-1)!.content += result.content;
          }
          if (result.reasoning_content) {
            history.value.at(-1)!.reasoning_content += result.reasoning_content;
          }
        }
      }
    })
    .catch((error: Error) => {
      ElNotification({ title: '请求失败', message: error.message, type: 'error' });
      history.value.at(-1)!.content += `请求失败：${error.message}`;
    })
    .finally(() => {
      history.value.at(-1)!.loading = false;
      requesting.value = false;
    });
};
const resetHistory = () => {
  history.value = [];
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
.loading {
  margin-top: 16px;
  margin-bottom: 24px;
}
.el-collapse {
  margin-top: 12px;
}
</style>
<style>
.no-padding {
  padding: 0 !important;
}
</style>
