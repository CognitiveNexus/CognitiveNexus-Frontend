<template>
    <div ref="container" class="dock-container">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { DockPanel, Widget } from '@lumino/widgets';
import { onMounted, onBeforeUnmount, provide, ref } from 'vue';

const props = defineProps<{
    spacing?: number;
}>();

const container = ref<HTMLElement>();
const dockPanel = new DockPanel({ spacing: props.spacing });
let resizeObserver: ResizeObserver;

provide('dockPanel', dockPanel);

onMounted(() => {
    if (container.value) {
        Widget.attach(dockPanel, container.value);
        updateLayout();

        resizeObserver = new ResizeObserver(() => {
            updateLayout();
        });
        resizeObserver.observe(container.value);
    }
});

onBeforeUnmount(() => {
    Widget.detach(dockPanel);
    if (resizeObserver && container.value) {
        resizeObserver.unobserve(container.value);
    }
});

const updateLayout = () => {
    requestAnimationFrame(() => {
        dockPanel.fit();
        dockPanel.update();
    });
};

defineExpose({ dockPanel });
</script>

<style scoped>
.dock-container {
    width: 100%;
    height: 100%;
    min-width: 200px;
    min-height: 200px;
    padding: 4px;
    overflow: hidden;
    display: flex;
}

::v-deep(.lm-DockPanel) {
    flex: 1;
}
</style>
