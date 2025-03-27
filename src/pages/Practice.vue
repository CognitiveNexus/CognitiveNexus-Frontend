<template>
    <el-container>
        <el-main><CodeRunner /></el-main>
        <!-- TODO: further integration -->
        <!-- <el-divider direction="vertical"></el-divider> -->
        <!-- <CodeEditor/> -->
    </el-container>
</template>

<script setup lang="ts" name="Practice">
import CodeRunner from '@/components/CodeRunner.vue';
</script>

<style scoped>
.el-divider {
    height: 100%;
}
.el-main {
    width: 50%;
}
</style>
