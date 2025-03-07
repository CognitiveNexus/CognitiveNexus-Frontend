<template>
    <div class="player">
        <div class="text">Player</div>
    </div>
</template>

<script setup lang="ts" name="Player">

</script>

<style scoped>
    .player{
        padding: 5px 0px;
        width: 100%;
        height: 24px;
        background-color: #393939;
        color: #BBBBBB;
        font-weight: bold;
        user-select: none;/* 不可选中 */
        font-size: 15px;
    }

    .player .text{
        width: 200px;
        position: relative;
        left: 15px;
    }
</style>