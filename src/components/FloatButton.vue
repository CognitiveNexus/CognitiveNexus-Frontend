<template>
  <div ref="floatButton" class="float-button" @mousedown="onMouseDown" @click="handleClick">
    <slot name="default">
      <el-button class="shadow-button" type="info" size="large" round v-bind="$attrs">{{ buttonText ?? '' }}</el-button>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['click']);
const { buttonText } = defineProps<{ buttonText?: string }>();
const floatButton = ref<HTMLElement | null>(null);

let isDragging = false;
let hasDragged = false;
let transform = { offsetX: 0, offsetY: 0 };

const onMouseDown = (event: MouseEvent) => {
  if (!floatButton.value) return;

  const downX = event.clientX;
  const downY = event.clientY;
  const { offsetX, offsetY } = transform;

  const rect = floatButton.value.getBoundingClientRect();
  const targetLeft = rect.left;
  const targetTop = rect.top;
  const targetWidth = rect.width;
  const targetHeight = rect.height;

  const clientWidth = document.documentElement.clientWidth;
  const clientHeight = document.documentElement.clientHeight;

  const minLeft = -targetLeft + offsetX;
  const minTop = -targetTop + offsetY;
  const maxLeft = clientWidth - targetLeft - targetWidth + offsetX;
  const maxTop = clientHeight - targetTop - targetHeight + offsetY;

  isDragging = true;
  hasDragged = false;

  const onMouseMove = (moveEvent: MouseEvent) => {
    // Reference:
    // element-plus/hooks/use-draggable

    if (!isDragging || !floatButton.value) return;

    let moveX = offsetX + moveEvent.clientX - downX;
    let moveY = offsetY + moveEvent.clientY - downY;

    moveX = Math.min(Math.max(moveX, minLeft), maxLeft);
    moveY = Math.min(Math.max(moveY, minTop), maxTop);

    if (Math.abs(moveX - offsetX) > 2 || Math.abs(moveY - offsetY) > 2) {
      hasDragged = true;
    }

    transform = { offsetX: moveX, offsetY: moveY };

    floatButton.value.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const onMouseUp = () => {
    if (!isDragging) return;

    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
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
