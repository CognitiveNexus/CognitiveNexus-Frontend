<template>
  <div>{{ courseName }} : p{{ practiceIndex }}</div>
</template>

<script setup lang="ts" name="Practice">
import type { CourseName } from "@/types/CoursesNameType";
const props = defineProps<{ courseName: CourseName; practiceIndex: number }>();
</script>

<style scoped></style>
