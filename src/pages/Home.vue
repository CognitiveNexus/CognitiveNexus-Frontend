<template>
  <div class="bg">
    <div class="title">
      <div class="main-title">思维脉络</div>
      <br />
      <div class="sub-title">—— C语言算法可视化学习平台</div>
    </div>
    <Carousel />
    <div class="btn-group">
      <el-button
        :icon="Promotion"
        type="success"
        size="large"
        round
        @click="handleStart()"
        >Start</el-button
      >
    </div>
    <div class="specify">我们的特色</div>
    <div class="proj-info">
      <el-card></el-card>
      <el-card>2</el-card>
      <el-card>3</el-card>
    </div>
  </div>
</template>

<script setup lang="ts" name="Home">
import { Promotion } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();

function handleStart() {
  router.push("/course");
}
</script>

<style scoped>
.bg {
  background: linear-gradient(
    125deg,
    #5971b4,
    #7656a1,
    #a14d5b,
    #b69858,
    #57b18e,
    #5e78c0
  );
  background-size: 400%;
  background-blend-mode: normal;
  width: 100%;
  height: 100%;
  animation: bgmove 20s infinite;
  animation-direction: alternate;
}

@keyframes bgmove {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 100% 50%;
  }
}

.title {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  font-family: "ChuangKeTieJin";
  flex-direction: column;
  line-height: 0.8;
  margin: 70px 0px;
}

.main-title {
  font-size: 80px;
  font-weight: 700;
}

.sub-title {
  font-size: 40px;
  font-weight: 400;
}

.el-button {
  align-items: center;
}

.btn-group {
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.specify {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  font-family: "ChuangKeTieJin";
  margin-top: 250px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  font-size: 40px;
}

.proj-info {
  margin-top: 50px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: row;
}

.el-card {
  height: 500px;
  width: 20%;
  margin-left: 10%;
  transition: all 0.3s ease;
}

.el-card:hover {
  box-shadow: 0 0 20px rgb(94, 50, 255);
}
</style>
