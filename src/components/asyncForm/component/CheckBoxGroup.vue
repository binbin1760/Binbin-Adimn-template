<template>
  <n-checkbox-group v-model:value="inputVal" @update-value="change">
    <n-space>
      <n-checkbox
        v-for="(item, index) in options"
        :key="index"
        :value="item.value"
        :label="item.label"
      />
    </n-space>
  </n-checkbox-group>
</template>
<script setup lang="ts">
const props = defineProps<{
  value: any;
  options: Record<string, any>;
}>();
const inputVal = ref(props.value);
const options = ref(props.options);
const emit = defineEmits(["UpdateValue"]);
function change(val) {
  inputVal.value = val;
  emit("UpdateValue", val);
}
</script>
<style scoped lang="less"></style>
