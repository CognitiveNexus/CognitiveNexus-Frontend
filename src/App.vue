<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import CodeRunner from '@/components/CodeRunner.vue';
</script>

<template>
    <ElConfigProvider :locale="zhCn">
        <CodeRunner />
    </ElConfigProvider>
</template>

<style scoped></style>
