<template>
  <el-container>
    <el-main>
      <div class="cards">
        <el-card
          style="max-width: 300px"
          shadow="hover"
          v-for="item in course_list"
        >
          <img
            :src="imageMap[item.name]"
            :alt="item.name"
            width="200px"
            height="200px"
            style="border-radius: 5px"
          />
          <template #footer>
            <el-text>{{ item.title }}</el-text>
            <el-button
              type="success"
              :icon="Promotion"
              round
              @click="handleClick(item.path)"
              style="float: right"
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
import { ref } from "vue";

const images = import.meta.glob("@/assets/course/*.png", { eager: true });
const imageMap = Object.entries(images).reduce((acc, [path, module]) => {
  const name = path.split("/").pop()?.replace(".png", "");
  if (name) acc[name] = (module as any).default;
  console.log(acc);
  return acc;
}, {} as Record<string, string>);

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
