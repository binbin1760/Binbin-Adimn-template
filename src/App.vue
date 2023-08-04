<template>
  <layout>
    <template v-slot:side>
      <div class="side">
        <div class="title">Binbin-admin</div>
        <n-config-provider :theme-overrides="customTheme">
          <n-menu
            :options="menuOptions"
            key-field="whateverKey"
            label-field="whateverLabel"
            children-field="whateverChildren"
          />
        </n-config-provider>
      </div>
    </template>
    <template v-slot:content> </template>
  </layout>
</template>

<script setup lang="ts">
import layout from "./components/layout.vue";
import type { MenuOption } from "naive-ui";
import { GlobalThemeOverrides } from "naive-ui";

const customTheme: GlobalThemeOverrides = {
  Menu: {
    itemColorHoverInverted: "red",
    itemTextColor: "white",
  },
};

const menuOptions: MenuOption[] = [
  {
    whateverLabel: "且听风吟",
    whateverKey: "hear-the-wind-sing",
  },
];
</script>

<style scoped>
.side {
  box-sizing: border-box;
  font-size: 1.8rem;
  background-color: rgb(0, 20, 40);
  color: #ffff;
  height: 100vh;
}
.title {
  padding: 1rem;
}
</style>
