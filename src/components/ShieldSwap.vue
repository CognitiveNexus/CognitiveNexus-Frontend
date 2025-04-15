<template>
  <div class="shield-swap-container">
    <div ref="bronzeShield" class="shield bronze-shield">青铜盾</div>
    <div ref="silverShield" class="shield silver-shield">白银盾</div>
    <div class="shield-swap-destination">
      <div ref="rack1" class="destination rack">盾牌架1</div>
      <div ref="rack2" class="destination rack">盾牌架2</div>
      <div ref="floor" class="destination floor">地板</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import interact from 'interactjs';

const emit = defineEmits(['accomplished']);

const bronzeShield = ref<HTMLElement>();
const silverShield = ref<HTMLElement>();
const rack1 = ref<HTMLElement>();
const rack2 = ref<HTMLElement>();
const floor = ref<HTMLElement>();

const bronzeInitialPosition = { x: 0, y: 0 };
const silverInitialPosition = { x: 0, y: 0 };
const bronzePosition = ref({ ...bronzeInitialPosition });
const silverPosition = ref({ ...silverInitialPosition });

function isValidDropZone(event: any, dropZones: HTMLElement[]) {
  const { x: clientX, y: clientY } = event.client;
  return dropZones.find((zone) => {
    const rect = zone.getBoundingClientRect();
    return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
  });
}

function alignToZone(shield: HTMLElement, zone: HTMLElement) {
  const shieldRect = shield.getBoundingClientRect();
  const zoneRect = zone.getBoundingClientRect();

  const containerRect = shield.parentElement!.getBoundingClientRect();
  const offsetX = zoneRect.left - containerRect.left + (zoneRect.width - shieldRect.width) / 2;
  const offsetY = zoneRect.top - containerRect.top + (zoneRect.height - shieldRect.height) / 2;

  return { x: offsetX, y: offsetY };
}

function setupDraggable(shield: HTMLElement, position: typeof bronzePosition, initialPosition: { x: number; y: number }, dropZones: HTMLElement[]) {
  interact(shield).draggable({
    inertia: false,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: false,
      }),
    ],
    listeners: {
      start() {
        shield.style.zIndex = '10';
      },
      move(event) {
        position.value.x += event.dx;
        position.value.y += event.dy;
        event.target.style.transform = `translate(${position.value.x}px, ${position.value.y}px)`;
      },
      end(event) {
        shield.style.zIndex = '5';
        const validZone = isValidDropZone(event, dropZones);
        if (validZone) {
          const newPos = alignToZone(event.target, validZone);
          position.value = newPos;
          event.target.style.transform = `translate(${newPos.x}px, ${newPos.y}px)`;
        } else {
          position.value = { ...initialPosition };
          event.target.style.transform = `translate(${initialPosition.x}px, ${initialPosition.y}px)`;
        }
      },
    },
  });
}

onMounted(() => {
  if (bronzeShield.value && silverShield.value && rack1.value && rack2.value && floor.value) {
    const dropZones = [rack1.value, rack2.value, floor.value];

    bronzeInitialPosition.x = 0;
    bronzeInitialPosition.y = 0;
    silverInitialPosition.x = 0;
    silverInitialPosition.y = 0;

    setupDraggable(bronzeShield.value, bronzePosition, bronzeInitialPosition, dropZones);
    setupDraggable(silverShield.value, silverPosition, silverInitialPosition, dropZones);
  }
});
</script>

<style scoped>
.shield-swap-container {
  position: relative;
  height: 90vh;
  border: 1px solid #ccc;
}

.shield {
  width: 60px;
  height: 50px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  touch-action: none;
  user-select: none;
  cursor: move;
}

.bronze-shield {
  background-color: #88ff88;
  top: 20px;
  left: 20px;
}

.silver-shield {
  background-color: #cccccc;
  top: 20px;
  left: 100px;
}

.shield-swap-destination {
  display: flex;
  gap: 10px;
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.destination {
  position: relative;
}

.rack {
  background-color: #880000;
  width: 100px;
  height: 100px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floor {
  background-color: #880000;
  width: 100px;
  height: 50px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
