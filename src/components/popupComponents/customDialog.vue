<template>
    <div class="dialog " @click="closePop">
        <div class="animate__animated animate__fadeIn animate__faster  dialog-main" @click.stop="clickMain">
            <applyPassVue></applyPassVue>
        </div>
    </div>
</template>
<script setup  lang='ts'>
import { applyPassVue } from './Poplist'
function closePop() {
    const body = document.getElementsByTagName('body')
    if (body[0].lastChild) {
        document.body.removeChild(body[0].lastChild);
    }
}
function clickMain() { }

</script>
<style scoped lang='less'>
.dialog {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, .4);
    top: 0;
    left: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;

    .dialog-main {
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
}
</style>