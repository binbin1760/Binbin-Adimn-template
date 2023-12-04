<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view />
  </n-config-provider>
</template>

<script setup lang="ts">
import { GlobalThemeOverrides } from 'naive-ui';
const themeOverrides: GlobalThemeOverrides = {
  Checkbox: {
    border: '1px solid #63E2B7',
    colorChecked: '#63E2B7',
    boxShadowFocus: '#63E2B7',
    borderFocus: '1px solid #63E2B7',
  },
  Form: {
    labelFontSizeLeftMedium: '16px'
  },
  Drawer: {
    bodyPadding: '16px 0 16px 24px'
  }
}
</script>

<style scoped></style>
