<template>
  <n-config-provider :theme-overrides="customTheme">
    <n-tabs
      class="card-tabs"
      default-value="signin"
      size="large"
      justify-content="space-evenly"
      :pane-wrapper-style="wrapperStyle"
      type="line"
    >
      <n-tab-pane name="signin" tab="账号登录">
        <n-form>
          <div class="input-class">
            <n-input
              v-model:value="id"
              size="large"
              placeholder="请输入账户名称"
            />
            <n-input
              v-model:value="paw"
              size="large"
              placeholder="请输入登录密码"
            />
          </div>
        </n-form>
        <div class="button-class" @click="">
          <n-button color="rgb(64, 158, 255)" block strong @click="login()">
            登录
          </n-button>
        </div>
      </n-tab-pane>
      <n-tab-pane name="signup" tab="短信登录">
        <n-form>
          <div class="input-class">
            <n-input
              v-model:value="phone"
              size="large"
              placeholder="请输入手机号码"
            />
            <n-input
              v-model:value="code"
              size="large"
              placeholder="请输入短信验证码"
            >
              <template #suffix>
                <span class="suffix" @click="getCode()">获取验证码</span>
              </template>
            </n-input>
          </div>
        </n-form>
        <div class="button-class">
          <n-button color="rgb(64, 158, 255)" block strong> 登录 </n-button>
        </div>
      </n-tab-pane>
    </n-tabs>
    <div class="prompt">
      <div @click="toRegister()">
        <span class="register">还没账号</span>
        立即注册
      </div>
      <div @click="forgetPaw()">忘记登录密码？</div>
    </div>
  </n-config-provider>
</template>
<script setup lang="ts">
import { GlobalThemeOverrides } from "naive-ui";
import { useRouter } from "vue-router";

const emit = defineEmits(["change"]);

const id = ref("");
const paw = ref("");
const phone = ref("");
const code = ref("");
const Router = useRouter();
const customTheme: GlobalThemeOverrides = {
  Tabs: {
    barColor: "rgba(64, 158, 255, 1)",
    tabTextColorHoverLine: "black",
    tabFontSizeLarge: "1.8rem",
    tabTextColorActiveLine: "black",
    tabFontWeight: "650",
    tabFontWeightActive: "650",
    tabPaddingLargeLine: "1.4rem 51px",
    panePaddingLarge: "7rem 0 0 0",
  },
  Input: {
    borderHover: "1px solid rgba(64, 158, 255, 1)",
    borderFocus: "1px solid rgba(64, 158, 255, 1)",
    boxShadowFocus: "0 0 3px rgba(64, 158, 255, 0.2)",
    heightLarge: "4.5rem",
    fontSizeLarge: "1.4rem",
  },
  Button: {
    heightMedium: "4.5rem",
    fontSizeMedium: "1.6rem",
  },
};
const wrapperStyle = {
  margin: "0 -4px",
  color: "red",
};

function login() {
  Router.push("/online/api");
}
function getCode() {
  //TODOO
}
function toRegister() {
  emit("change", "register");
}
function forgetPaw() {
  emit("change", "forgetpaw");
}
</script>
<style scoped>
.card-tabs {
  font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC",
    sans-serif;
}
.input-class {
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
}
.button-class {
  font-family: "PingFangSC-Regular", "PingFang SC", sans-serif;
  margin-top: 5rem;
}
.suffix {
  color: #409eff;
  font-size: 12px;
  font-family: "PingFangSC-Regular", "PingFang SC", sans-serif;
  cursor: pointer;
}
.prompt {
  display: flex;
  justify-content: space-between;
  height: 5rem;
  line-height: 5rem;
  font-family: "PingFangSC-Regular", "PingFang SC", sans-serif;
  color: #409eff;
  font-size: 1.4rem;
  cursor: pointer;
}
.prompt .register {
  color: #999999;
}
</style>
