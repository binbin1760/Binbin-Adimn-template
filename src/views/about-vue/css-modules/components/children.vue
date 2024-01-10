<template>
<div class="slot-color">
    <slot>
        子组件默认插槽
    </slot>
</div>
</template>
<script setup  lang='ts'>
</script>
<style scoped lang='less'>

:slotted(div) {
  color: red;
}
</style>