<template>
    <div class="apply-pass">
        <div class="title-box">
            <div class="title">
                <div class="x-divider"></div>
                <div>提示</div>
            </div>
            <div>
                <closeIcon></closeIcon>
            </div>
        </div>
        <div class="divider"></div>
        <div class="content">请确认是否通过申请</div>
        <div class="buttons">
            <NButton>取消</NButton>
            <NButton type="info">通过</NButton>
        </div>
    </div>
</template>
<script setup  lang='ts'>
import { closeIcon } from "@/icon-list";
</script>
<style scoped lang='less'>
.apply-pass {
    width: 37rem;
    height: 25rem;
    background: #FFFFFF;
    border-radius: 12px;
    font-family: 'PingFangSC-Medium';
    font-weight: 500;

    .title-box {
        padding: 0 1.8rem;
        padding-top: 1.7rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        color: #2B2828;

        .title {
            display: flex;
            align-items: center;
            gap: 0.8rem;
        }

        .x-divider {
            width: 2px;
            height: 1.4rem;
            background-color: #0083FF;
        }
    }

    .divider {
        width: 100%;
        height: 1px;
        background-color: #F1F1F1;
    }

    .content {
        font-family: 'PingFangSC-Medium';
        font-size: 16px;
        color: #2B2828;
        padding: 45.5px 0 48px 0;
        text-align: center;
    }

    .buttons {
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 3.6rem;
    }
}
</style>