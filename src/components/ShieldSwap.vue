<template>
  <div class="shield-swap-container">
    <Confetti ref="confettiRef" class="absolute left-0 top-0 z-0 size-full no-pointer-events" style="pointer-events: none" manualstart />
    <img ref="bronzeShield" :src="shieldBronzeImg" class="shield" />
    <img ref="silverShield" :src="shieldSilverImg" class="shield" />
    <div class="shield-swap-destination">
      <div class="rack-container">
        <img ref="bronzeRack" :src="rackBronzeImg" class="destination rack" />
        <img ref="silverRack" :src="rackSilverImg" class="destination rack" />
      </div>
      <img ref="floor" :src="floorImg" class="destination floor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import interact from 'interactjs';
import shieldBronzeImg from '@/assets/img/shieldBronze.png';
import shieldSilverImg from '@/assets/img/shieldSilver.png';
import rackBronzeImg from '@/assets/img/rackBronze.png';
import rackSilverImg from '@/assets/img/rackSilver.png';
import floorImg from '@/assets/img/floor.png';

const emit = defineEmits(['accomplished']);
const confettiRef = ref();

const bronzeShield = ref<HTMLElement>();
const silverShield = ref<HTMLElement>();
const silverRack = ref<HTMLElement>();
const bronzeRack = ref<HTMLElement>();
const floor = ref<HTMLElement>();

const bronzePosition = ref({ x: 0, y: 0 });
const silverPosition = ref({ x: 0, y: 0 });

const bronzeCurrentZone = ref<'silverRack' | 'bronzeRack' | 'floor'>('silverRack');
const silverCurrentZone = ref<'silverRack' | 'bronzeRack' | 'floor'>('bronzeRack');

watchEffect(() => {
  if (bronzeCurrentZone.value === 'bronzeRack' && silverCurrentZone.value === 'silverRack') {
    confettiRef.value?.fire({ zIndex: 50 });
    emit('accomplished');
  }
});

function getZoneType(zoneElement: HTMLElement): 'silverRack' | 'bronzeRack' | 'floor' {
  if (zoneElement === silverRack.value) return 'silverRack';
  if (zoneElement === bronzeRack.value) return 'bronzeRack';
  if (zoneElement === floor.value) return 'floor';
  throw new Error('Invalid zone element');
}

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

function setupDraggable(
  shield: HTMLElement,
  position: typeof bronzePosition,
  dropZones: HTMLElement[],
  currentZone: typeof bronzeCurrentZone,
  otherCurrentZone: typeof silverCurrentZone
) {
  interact(shield).draggable({
    inertia: false,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: false,
      }),
    ],
    listeners: {
      start(event) {
        shield.style.zIndex = '10';
        event.target.dataset.startX = String(position.value.x);
        event.target.dataset.startY = String(position.value.y);
      },
      move(event) {
        position.value.x += event.dx;
        position.value.y += event.dy;
        event.target.style.transform = `translate(${position.value.x}px, ${position.value.y}px)`;
      },
      end(event) {
        shield.style.zIndex = '5';
        const validZone = isValidDropZone(event, dropZones);
        const startX = parseFloat(event.target.dataset.startX || '0');
        const startY = parseFloat(event.target.dataset.startY || '0');

        if (validZone) {
          const targetZoneType = getZoneType(validZone);

          if (otherCurrentZone.value === targetZoneType) {
            position.value = { x: startX, y: startY };
            event.target.style.transform = `translate(${startX}px, ${startY}px)`;
            return;
          }

          const newPos = alignToZone(event.target, validZone);
          position.value = newPos;
          event.target.style.transform = `translate(${newPos.x}px, ${newPos.y}px)`;
          currentZone.value = targetZoneType;
        } else {
          position.value = { x: startX, y: startY };
          event.target.style.transform = `translate(${startX}px, ${startY}px)`;
        }
      },
    },
  });
}

onMounted(() => {
  Promise.all([
    new Promise((resolve) => silverRack.value?.addEventListener('load', resolve)),
    new Promise((resolve) => bronzeRack.value?.addEventListener('load', resolve)),
    new Promise((resolve) => bronzeShield.value?.addEventListener('load', resolve)),
    new Promise((resolve) => silverShield.value?.addEventListener('load', resolve)),
  ]).then(() => {
    if (bronzeShield.value && silverShield.value && silverRack.value && bronzeRack.value && floor.value) {
      const dropZones = [silverRack.value, bronzeRack.value, floor.value];

      const bronzeInitialPos = alignToZone(bronzeShield.value, silverRack.value);
      bronzePosition.value = bronzeInitialPos;
      bronzeShield.value.style.transform = `translate(${bronzeInitialPos.x}px, ${bronzeInitialPos.y}px)`;

      const silverInitialPos = alignToZone(silverShield.value, bronzeRack.value);
      silverPosition.value = silverInitialPos;
      silverShield.value.style.transform = `translate(${silverInitialPos.x}px, ${silverInitialPos.y}px)`;

      setupDraggable(bronzeShield.value, bronzePosition, dropZones, bronzeCurrentZone, silverCurrentZone);
      setupDraggable(silverShield.value, silverPosition, dropZones, silverCurrentZone, bronzeCurrentZone);
    }
  });
});
</script>

<style scoped>
.shield-swap-container {
  position: relative;
  height: 90vh;
  z-index: 1;
}

.shield {
  height: 280px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  touch-action: none;
  user-select: none;
  cursor: move;
}

.shield-swap-destination {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.rack-container {
  display: flex;
  gap: 10px;
}

.destination {
  position: relative;
}

.rack {
  height: 240px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floor {
  margin-top: 50px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
