<template>
  <div class="login">
    <div class="login-from">
      <div class="loginImg">
        <div class="icon"></div>
        <img class="img" :src="loginImg" alt="" />
      </div>
      <div class="login-tab">
        <Tab @change="getType"></Tab>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import loginImg from "@/assets/login/login.png";
import { Tab } from "./components";

const componentType = ref("");
function getType(type: string) {
  componentType.value = type;
}
</script>
<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.6rem;
}
.login .login-from {
  display: flex;
  align-items: center;
  width: 86rem;
  height: 61.5rem;
  background: inherit;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.34901960784313724);
  border-radius: 0.6rem;
  overflow: hidden;
}
.login .login-from .loginImg {
  width: 37rem;
  height: 61.5rem;
  background-color: rgba(64, 158, 255, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.login .login-from .loginImg .icon {
  font-family: "FontAwesome5Brands-Regular", "Font Awesome 5 Brands", sans-serif;
  font-size: 10rem;
  color: #fff;
  padding: 0.2rem;
  box-sizing: border-box;
  margin-top: 4rem;
}
.login .login-from .loginImg .icon img {
  width: 12rem;
  height: 12rem;
}
.login .login-from .loginImg .img {
  width: 37rem;
}
.login .login-from .login-tab {
  box-sizing: border-box;
  width: 49rem;
  height: 61.5rem;
  margin-top: 1rem;
  padding: 0 7rem;
}
</style>
