<template>
    <div class="async">
        <h1>
            useAsync hooks
        </h1>
        <div>
            {{ list }}
        </div>
        <div class="text">
            重要知识点：异步(Promise)与Js事件循环机制
        </div>
    </div>
</template>
<script setup>
import { defineComponent, ref } from 'vue'
import { useAsync } from '@/hooks/useAsync2'
import { testPromise } from '@/api/index'

const { data:list } = useAsync(
    testPromise,
    {
        initialData: []
    }
)

</script>
<style lang="less" scoped>
   .async{
    height: 100%;
    background-color: white;
   } 
   .text{
    color: red;
   }
</style>
