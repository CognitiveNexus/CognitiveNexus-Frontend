<template>
  <el-dialog :model-value="showLoginDialog" :show-close="false" width="24em" header-class="no-bottom-padding">
    <template #header>
      <el-form-item>
        <el-segmented v-model="selectedTab" :options="tabs" size="large" style="width: 100%" />
      </el-form-item>
    </template>
    <el-form label-width="auto">
      <el-form-item label="用户名" label-position="right">
        <el-input v-model="username" />
      </el-form-item>
      <el-form-item label="密码" label-position="right">
        <el-input v-model="password" type="password" />
      </el-form-item>
      <el-form-item v-show="selectedTab == 'register'" label="邀请码" label-position="right">
        <el-input v-model="inviteCode" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submit" :loading="requesting">{{ actionName }}</el-button>
        <el-button @click="showLoginDialog = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { ElNotification } from 'element-plus';
import { useAuthStore } from '@/stores/Auth';
import sendRequest from '@/utils/SendRequest.ts';

const authStore = useAuthStore();
const { showLoginDialog } = storeToRefs(authStore);

const tabs = [
  { label: '登录', value: 'login' },
  { label: '注册', value: 'register' },
];
const selectedTab = ref<string>('login');
const actionName = computed(() => (selectedTab.value == 'login' ? '登录' : '注册'));
const requesting = ref<boolean>(false);

const username = ref<string>('');
const password = ref<string>('');
const inviteCode = ref<string>('');

const submit = async () => {
  requesting.value = true;
  const data: { username: string; password: string; invite_code?: string } = {
    username: username.value,
    password: password.value,
  };
  if (selectedTab.value === 'register') {
    data.invite_code = inviteCode.value;
  }
  await sendRequest(false, `/api/auth/${selectedTab.value}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result?.error) {
        ElNotification({
          title: '登录失败',
          message: result.error,
          type: 'error',
        });
      } else {
        authStore.setAuth(result.token, result.username);
        ElNotification({
          title: `${actionName.value}成功`,
          message: result.success,
          type: 'success',
        });
        showLoginDialog.value = false;
      }
    })
    .catch((reason: Error) => {
      ElNotification({
        title: `${actionName.value}失败`,
        message: reason.message,
        type: 'error',
      });
    })
    .finally(() => {
      requesting.value = false;
    });
};
</script>
<style>
.no-bottom-padding {
  padding-bottom: 0 !important;
}
</style>
