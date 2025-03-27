<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/course' }">
      homepage
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { useBreadcrumbStore } from "@/stores/Breadcrumb";
const store = useBreadcrumbStore();
</script>

<style scoped></style>
