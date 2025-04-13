<template>
  <div class="course">
    <el-container class="course-main">
      <template v-if="currentPage.type === 'story'">
        <!-- <el-aside class="story-emblem-container">
          <Emblem :emblem="currentPage.emblem" />
        </el-aside> -->
        <!-- <el-divider direction="vertical" class="vertical-divider" /> -->
        <el-main
          class="story-main-container"
          :class="{
            parchment: pageIndex <= 1,
            weaponshop: pageIndex === 2 || pageIndex === 4 || pageIndex === 5,
            castle: pageIndex === 7,
            monster: pageIndex === 8,
            monsterdim: pageIndex === 9 || pageIndex === 10,
          }"
        >
          <div class="story-content-container">
            <PaginationControl :current="pageIndex" :total="currentCourse.pages.length" class="pagination" @prev="gotoPage(-1, true)" @next="gotoPage(1, true)">
              <CourseContent :contents="currentPage.contents" @goto="gotoPage" />
            </PaginationControl>
          </div>
          <div class="story-character" v-if="pageIndex === 2 || pageIndex === 4 || pageIndex === 5 || pageIndex === 7 || pageIndex === 10">
            <BlurEntrance>
              <InfiniteMoving>
                <img src="../assets/emblem/shopkeeper-1.png" v-if="pageIndex === 2" />
                <img src="../assets/emblem/shopkeeper-2.png" v-if="pageIndex === 4" />
                <img src="../assets/emblem/shopkeeper-3.png" style="width: 300px" v-if="pageIndex === 7" />
              </InfiniteMoving>
            </BlurEntrance>
            <ColumnChart :index="pageIndex / 5" v-if="pageIndex === 5 || pageIndex === 10" />
          </div>
        </el-main>
      </template>
      <template v-else>
        <el-aside class="practice-content-container">
          <CourseContent :contents="currentPage.contents" :solved="pageFinished" @goto="gotoPage" />
        </el-aside>
        <el-divider direction="vertical" class="vertical-divider"></el-divider>
        <el-main class="practice-judger-container">
          <CodeJudger
            :tests="currentPage.judge"
            :generateTests="currentPage.randomJudge"
            :defaultCode="currentPage.defaultCode"
            :defaultLine="currentPage.defaultLine"
            @accomplished="updateProgress()"
          />
        </el-main>
      </template>
    </el-container>
    <div class="course-comments">
      <Comments :courseName="courseName" />
    </div>
  </div>
</template>

<script setup lang="ts" name="Course">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import ColumnChart from '@/components/visualize/ColumnChart.vue';
import Comments from '@/components/Comments.vue';
import courses from '@/courses/index';
import { useProgressStore } from '@/stores/Progress';

const route = useRoute();
const router = useRouter();
const pageIndex = computed(() => Math.max(0, parseInt(route.params.pageIndex as string) - 1));
const courseName = computed(() => route.params.courseName as string);

const currentCourse = computed(() => courses[courseName.value]);
const currentPage = computed(() => currentCourse.value.pages[pageIndex.value]);

const progressStore = useProgressStore();
const { setProgress } = progressStore;
const { progress } = storeToRefs(progressStore);

const currentProgress = computed(() => progress.value[courseName.value] ?? 0);
const pageFinished = computed(() => currentProgress.value - 1 >= pageIndex.value);

const updateProgress = (page?: number) => {
  if (!page) page = pageIndex.value;
  if (page + 1 >= currentProgress.value) {
    setProgress(courseName.value, page + 1);
  }
};

const gotoPage = (page: number, relative?: boolean) => {
  if (relative) page += pageIndex.value;
  if (currentCourse.value.pages[page].type === 'story') {
    updateProgress(page);
  }

  router.push({
    name: 'course',
    params: {
      courseName: courseName.value,
      pageIndex: page + 1,
    },
  });
};
</script>

<style scoped>
.course {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
  width: 100%;
}
.course-main {
  flex: 1;
  min-height: calc(100vh - 60px);
}
.course-comments {
  width: 100%;
  border-top: 1px solid #e5e7eb;
}
.story-main-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.parchment {
  background: url(../assets/emblem/parchment.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.weaponshop {
  background: url(../assets/emblem/weaponshop.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.castle {
  background: url(../assets/emblem/castle.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.monster {
  background: url(../assets/emblem/monster.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.monsterdim {
  background: url(../assets/emblem/monster-dim.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.story-character {
  height: 100%;
  width: 40%;
}
.story-content-container {
  padding-top: 30px;
  padding-right: 70px;
  width: 40%;
  height: 99%;
  overflow: hidden;
  background-image: url(../assets/emblem/page.png);
  background-repeat: no-repeat;
  background-size: 90%;
}
.story-emblem-container {
  padding: 0px;
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.practice-content-container {
  height: 100%;
  width: 33%;
  padding: 20px;
}
.practice-judger-container {
  height: 100%;
  width: 67%;
}
.pagination {
  flex: 1;
  min-width: 30%;
  height: 100%;
  display: flex;
}
.vertical-divider {
  height: 100%;
}
</style>
