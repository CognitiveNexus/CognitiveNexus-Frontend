<template>
  <el-container>
    <el-main>
      <div class="cards">
        <el-card
          style="max-width: 300px"
          shadow="hover"
          v-for="item in course_list"
        >
          <el-text>{{ item.title }}</el-text>
          <template #footer>
            <el-text>{{ item.title }}</el-text>
            <el-button
              type="success"
              :icon="Promotion"
              round
              @click="handleClick(item.path)"
              >Go
            </el-button>
          </template>
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts" name="CourseCard">
import { Promotion } from "@element-plus/icons-vue";
import { useCourseStoreManager } from "@/stores/courses";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const store = useCourseStoreManager();
const { course_list } = storeToRefs(store);
const router = useRouter();

function handleClick(path: string) {
  router.push(path);
}
</script>

<style scoped>
.cards {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
</style>
