<template>
  <!-- Reference: VitePress Default Theme Home Page -->
  <div class="home">
    <div class="home-hero">
      <div class="home-hero-left">
        <h1 class="home-heading">
          <span class="heading-name">思维脉络</span>
          <span>沉浸、可视化的<br />C 语言交互微课堂</span>
        </h1>
        <p class="home-tagline">{{ isAuthenticated ? `欢迎您，${username}！` : '沉浸式的趣味 C 语言学习体验' }}</p>
        <div class="home-buttons">
          <template v-if="!isAuthenticated">
            <span class="home-button home-button-primary" @click="openLoginDialog('login')">登录</span>
            <span class="home-button home-button-secondary" @click="openLoginDialog('register')">注册</span>
          </template>
          <template v-else>
            <span class="home-button home-button-primary" @click="router.push('/course')">进入课堂</span>
            <span class="home-button home-button-secondary" @click="router.push('/profile')">学习记录</span>
            <span class="home-button home-button-secondary" @click="logout()">退出登录</span>
          </template>
        </div>
      </div>
      <div class="home-hero-right">
        <div class="logo-container">
          <div class="logo-bg"></div>
          <img class="logo" src="/logo.svg" />
        </div>
      </div>
    </div>
    <div class="home-intro">
      <div class="intro-card-container">
        <div class="intro-card">
          <div class="card-content">
            <div class="card-icon">📚</div>
            <h2 class="card-title">知识点解析</h2>
            <p class="card-detail">我们提供丰富的知识点解析，助您扎实掌握 C 语言基础。</p>
          </div>
        </div>
      </div>
      <div class="intro-card-container">
        <div class="intro-card">
          <div class="card-content">
            <div class="card-icon">🏯</div>
            <h2 class="card-title">沉浸式体验</h2>
            <p class="card-detail">通过引人入胜的小故事，一步步亲自引导您完成一个完整程序。</p>
          </div>
        </div>
      </div>
      <div class="intro-card-container">
        <div class="intro-card">
          <div class="card-content">
            <div class="card-icon">📊</div>
            <h2 class="card-title">可视化展示</h2>
            <p class="card-detail">我们将枯燥的执行过程转换为一目了然的动画过程。</p>
          </div>
        </div>
      </div>
      <div class="intro-card-container">
        <div class="intro-card">
          <div class="card-content">
            <div class="card-icon">🤖</div>
            <h2 class="card-title">AI 导师</h2>
            <p class="card-detail">我们提供 AI 导师，随时随地解决您的各种疑惑。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Home">
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ElMessageBox, ElNotification } from 'element-plus';
import { useAuthStore } from '@/stores/Auth';

const router = useRouter();
const authStore = useAuthStore();
const { clearAuth } = authStore;
const { showLoginDialog, selectedTab, isAuthenticated, username } = storeToRefs(authStore);
const openLoginDialog = (tab: 'login' | 'register') => {
  selectedTab.value = tab;
  showLoginDialog.value = true;
};
const logout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '退出登录', {
      type: 'warning',
    });
  } catch (err) {
    return;
  }
  clearAuth();
  ElNotification({
    title: '退出登录成功',
    type: 'success',
  });
};
</script>

<style scoped>
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 80px;
}

.home-hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  padding: 64px;
}

.home-hero-left,
.home-hero-right {
  flex: 1;
}

.home-hero-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-heading {
  display: flex;
  flex-direction: column;
  color: #3c3c43;
  line-height: 64px;
  font-size: 56px;
  font-weight: 700;
  letter-spacing: -0.4px;
}

.heading-name {
  color: transparent;
  width: fit-content;
  background-clip: text;
  background-image: linear-gradient(-45deg, #bd34fe, #47caff);
}

.home-tagline {
  color: #67676c;
  padding-top: 12px;
  line-height: 36px;
  font-size: 24px;
}

.home-intro {
  width: 100%;
  max-width: 1280px;
  padding: 0 56px;
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.logo-container {
  position: relative;
  width: 320px;
  height: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 100%;
  height: 100%;
  padding: 18px;
  filter: drop-shadow(0px 0px 12px rgba(255, 255, 255, 0.25));
  position: absolute;
}

.logo-bg {
  width: 200px;
  height: 200px;
  background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  filter: blur(68px);
}

.home-buttons {
  display: flex;
  gap: 12px;
  padding-top: 32px;
}

.home-button {
  line-height: 38px;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
  border-radius: 20px;
  padding: 0 20px;
  cursor: pointer;
}

.home-button-primary {
  background-color: #7e57c2;
  color: #ffffff;
}

.home-button-secondary {
  background-color: #ebebef;
  color: #3c3c43;
}

.intro-card-container {
  width: 25%;
  padding: 8px;
}

.intro-card {
  display: block;
  border-radius: 12px;
  background-color: #f6f6f7;
  height: 100%;
}

.card-content {
  display: flex;
  flex-direction: column;
  padding: 24px;
  height: 100%;
}

.card-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 6px;
  background-color: rgba(142, 150, 170, 0.14);
  width: 48px;
  height: 48px;
  font-size: 24px;
}

.card-title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
  color: #3c3c43;
}

.card-detail {
  flex-grow: 1;
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  color: #67676c;
}
</style>
