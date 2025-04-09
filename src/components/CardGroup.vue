<template>
  <div class="cards">
    <template v-for="item in courseList">
      <el-card style="max-width: 300px" shadow="hover" v-if="item.diff === props.diff">
        <img :src="imageMap[item.name]" :alt="item.name" width="200px" height="200px" style="border-radius: 5px" />
        <template #footer>
          <el-text>{{ item.title }}</el-text>
          <el-button type="success" :icon="Promotion" round @click="handleClick(item.name)" style="float: right">Go </el-button>
        </template>
      </el-card>
    </template>
  </div>
</template>

<script setup lang="ts" name="CardGroup">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { Promotion } from '@element-plus/icons-vue';

import type { CourseName } from '@/types/CoursesNameType';
import { useCourseStoreManager } from '@/stores/courses';
import { useAuthStore } from '@/stores/Auth';

const props = defineProps({
  diff: String,
});

const images = import.meta.glob('@/assets/course/*.png', { eager: true });
const imageMap = Object.entries(images).reduce((acc, [path, module]) => {
  const name = path.split('/').pop()?.replace('.png', '');
  if (name) acc[name] = (module as any).default;
  return acc;
}, {} as Record<string, string>);

const store = useCourseStoreManager();
const { courseList } = storeToRefs(store);
const router = useRouter();

const { isAuthenticated, showLoginDialog } = storeToRefs(useAuthStore());

async function handleClick(name: CourseName) {
  if (!isAuthenticated.value) {
    try {
      await ElMessageBox.confirm('登录后可以享受完整高级功能（如AI导师、小练习等）。\n要现在登录或注册吗？', '用户未登录', {
        confirmButtonText: '好的',
        cancelButtonText: '稍后再说',
        type: 'info',
      });
      showLoginDialog.value = true;
      return;
    } catch (err) {}
  }
  router.push(`/course/${name}/1`);
}
</script>

<style scoped>
.cards {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
</style>
