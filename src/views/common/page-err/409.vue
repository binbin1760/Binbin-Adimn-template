<template>
  <div class="ban">
    <n-result
      status="403"
      title="未获取权限，禁止访问"
      description="新用户请联系管理员分配权限后重新登录，否者为登录失效需要重新登录"
      size="huge"
    >
      <template #footer>
        <n-button type="info" @click="goLogin">重新登录</n-button>
      </template>
    </n-result>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { removeUserInfo } from "@/utils";
const Router = useRouter();
function goLogin() {
  removeUserInfo();
  Router.push({ path: "/login" });
}
</script>
<style scoped lang="less">
.ban {
  margin-top: 20rem;
}
</style>
