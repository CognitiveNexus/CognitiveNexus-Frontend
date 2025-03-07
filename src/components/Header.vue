<template>
    <div class="header">
        <div class="text">Cognitive Nexus</div>
    </div>
    <div class="divider">

    </div>
</template>

<script setup lang="ts" name="Header">

</script>

<style scoped>
.header{
    padding: 5px 0px;
    width: 100%;
    height: 24px;
    background-color: #393939;
    color: #BBBBBB;
    font-weight: bold;
    user-select: none;/* 不可选中 */
    font-size: 15px;
}
.divider{
    background-color: #BBBBBB;
    width: 100%;
    height: 2px;
}
.header .text{
    width: 200px;
    position: relative;
    left: 15px;
}
</style>