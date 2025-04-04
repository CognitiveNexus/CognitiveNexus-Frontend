<template>
  <div ref="floatButton" class="float-button" @mousedown="onMouseDown" @click="handleClick">
    <slot name="default">
      <el-button class="shadow-button" type="info" size="large" circle v-bind="$attrs" />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['click']);
const floatButton = ref<HTMLElement | null>(null);
let isDragging = false;
let hasDragged = false;
let startX = 0;
let startY = 0;
let initialLeft = 0;
let initialTop = 0;

const onMouseDown = (event: MouseEvent) => {
  if (!floatButton.value) return;

  isDragging = true;
  hasDragged = false;

  startX = event.clientX;
  startY = event.clientY;

  const rect = floatButton.value.getBoundingClientRect();
  initialLeft = rect.left;
  initialTop = rect.top;

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

const onMouseMove = (event: MouseEvent) => {
  if (!isDragging || !floatButton.value) return;

  const deltaX = event.clientX - startX;
  const deltaY = event.clientY - startY;

  if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
    hasDragged = true;
  }

  floatButton.value.style.left = `${initialLeft + deltaX}px`;
  floatButton.value.style.top = `${initialTop + deltaY}px`;
};

const onMouseUp = () => {
  if (!isDragging) return;

  isDragging = false;
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
};

const handleClick = (event: MouseEvent) => {
  if (hasDragged) {
    event.stopPropagation();
    event.preventDefault();
    hasDragged = false;
    return;
  }
  emit('click', event);
};
</script>

<style scoped>
.float-button {
  position: fixed;
  right: 50px;
  bottom: 50px;
  cursor: grab;
  z-index: 1000;
}
.float-button:active {
  cursor: grabbing;
}
.shadow-button {
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
}
</style>
