<template>
    <div ref="content" class="dock-content">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { Widget, DockPanel, DockLayout } from '@lumino/widgets';
import { onMounted, onBeforeUnmount, inject, ref } from 'vue';

const props = defineProps<{
    id: string;
    title: string;
    mode?: DockLayout.InsertMode;
    refId?: string;
}>();

const content = ref<HTMLElement>();
const dockPanel = inject<DockPanel>('dockPanel');
let widget: Widget;

onMounted(() => {
    if (!dockPanel || !content.value) return;

    widget = new Widget({ node: content.value });
    widget.id = props.id;
    widget.title.label = props.title;
    widget.title.closable = true;

    if (props.refId) {
        let refWidget: Widget | null = null;
        for (let widget of dockPanel.children()) {
            if (widget.id == props.refId) {
                refWidget = widget;
                break;
            }
        }
        if (refWidget) {
            dockPanel.addWidget(widget, { mode: props.mode, ref: refWidget });
        }
    } else {
        dockPanel.addWidget(widget, { mode: props.mode });
    }

    dockPanel.fit();
    dockPanel.update();
});

onBeforeUnmount(() => {
    if (widget && !widget.isDisposed) {
        widget.dispose();
    }
});
</script>

<style>
.dock-content {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 8px;
}
</style>
