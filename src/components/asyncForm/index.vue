<template>
    <!-- render的优先级高于 template -->
</template>
<script lang='ts'>
import { NForm, FormRules } from 'naive-ui';
import { defineComponent, PropType } from 'vue'
import { FormConfig } from "./types";
import { initFormItemValue } from './base';

export default defineComponent({
    name: 'async-form',

    inheritAttrs: false,

    props: {
        formConfig: {
            type: Object as PropType<FormConfig>,
            required: true
        },
        rules: {
            type: Object as PropType<FormRules>,
            required: false
        },
    },

    emits: ['submit', 'cancel'],

    setup(props) {
        const { formItem } = props.formConfig
        //生成收集数据的对象
        /***
         * config:{
         *  type:'input',
         *  key:'name',
         *  label:'姓名',
         *  rules:{xxxx}
         * }
         */
        const model = {};
        formItem.forEach((item) => {
            model[item.key] = initFormItemValue(item.type);
        });
        return h(NForm, { model: model, rules: props.rules }, { default: () => "异步表单" })
    }
})
</script>
<style scoped lang='less'></style>