<template>
  <div class="cards">
    <template v-for="course in courses">
      <el-card style="max-width: 300px" shadow="hover">
        <img :src="thumbnails[course.id]" :alt="course.name" width="200px" height="200px" style="border-radius: 5px" />
        <template #footer>
          <el-text>{{ course.name }}</el-text>
          <el-button type="success" :icon="Promotion" round @click="handleClick(course.id)" style="float: right">Go</el-button>
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
import { useAuthStore } from '@/stores/Auth';
import { useProgressStore } from '@/stores/Progress';
import type { Course } from '@/types/CourseTypes';

const { courses } = defineProps<{
  courses: Course[];
}>();

const images = import.meta.glob('@/assets/course/*.png', { eager: true });
const thumbnails = Object.entries(images).reduce((acc, [path, module]) => {
  const name = path.match(/([^\/]+)\.png$/)![1];
  if (name) acc[name] = (module as any).default;
  return acc;
}, {} as { [courseId: string]: string });

const router = useRouter();
const { isAuthenticated, showLoginDialog } = storeToRefs(useAuthStore());
const { progress } = storeToRefs(useProgressStore());

async function handleClick(name: string) {
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
  router.push(`/course/${name}/${progress.value[name] ?? 0}`);
}
</script>

<style scoped>
.cards {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
</style>
