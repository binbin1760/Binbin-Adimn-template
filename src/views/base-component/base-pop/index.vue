<template>
    <div class="base-pop">
        <customDialogVue></customDialogVue>
    </div>
</template>
<script setup  lang='ts'>
import { customDialogVue } from "@/components";
</script>
<style scoped lang='less'>
.base-pop {
    height: 100%;
    flex: 1;
    padding: 1.6rem;
    background-color: white;
}
</style>