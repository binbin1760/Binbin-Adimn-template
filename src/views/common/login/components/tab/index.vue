<template>
  <n-config-provider :theme-overrides="customTheme">
    <n-tabs
      class="card-tabs"
      default-value="signup"
      size="large"
      justify-content="space-evenly"
      :pane-wrapper-style="wrapperStyle"
      type="line"
    >
      <n-tab-pane name="signin" tab="账号登录" :disabled="true">
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
          <n-button color="rgb(64, 158, 255)" block strong @click="tologin()">
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
              clearable
              placeholder="请输入手机号码"
              @focus="focusPhone"
              @blur="blurPhone"
            >
              <template #prefix>
                <n-icon size="24" :color="phoneSelect ? '#409EFF' : '#CCCCCC'">
                  <PhonePortraitSharp></PhonePortraitSharp>
                </n-icon>
              </template>
            </n-input>
            <n-input
              v-model:value="code"
              size="large"
              placeholder="请输入短信验证码"
              @focus="focusCode"
              @blur="blurCode"
            >
              <template #prefix>
                <n-icon size="24" :color="codeSelect ? '#409EFF' : '#CCCCCC'">
                  <MailSharp></MailSharp>
                </n-icon>
              </template>
              <template #suffix>
                <span v-if="!active" class="suffix" @click="getCode()"
                  >获取验证码</span
                >
                <div v-else class="suffix1">
                  <n-countdown
                    :render="renderCountdown"
                    :active="active"
                    :duration="60000"
                    @finish="timeUp"
                  />
                </div>
              </template>
            </n-input>
          </div>
        </n-form>
        <div class="button-class">
          <n-button
            color="rgb(64, 158, 255)"
            block
            strong
            @click="userRegister"
          >
            登录
          </n-button>
        </div>
        <div v-show="showTips" :style="messageStyle" class="tips1">
          {{ message }}
        </div>
      </n-tab-pane>
    </n-tabs>
    <!-- <div class="prompt">
      <div @click="toRegister()">
        <span class="register">还没账号</span>
        立即注册
      </div>
      <div @click="forgetPaw()">忘记登录密码？</div>
    </div> -->
  </n-config-provider>
</template>
<script setup lang="ts">
import { GlobalThemeOverrides, CountdownProps } from "naive-ui";
import { useRouter } from "vue-router";
import { PhonePortraitSharp, MailSharp } from "@vicons/ionicons5";

// const emit = defineEmits(["change"]);
const id = ref("");
const paw = ref("");
const phone = ref("");
const code = ref("");
const Router = useRouter();
const phoneSelect = ref<boolean>(false);
const codeSelect = ref<boolean>(false);
const showTips = ref<boolean>(false);
const message = ref("");
const messageStyle = ref();
const active = ref<boolean>(false);
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
const renderCountdown: CountdownProps["render"] = ({ seconds }) => {
  return h(
    "span",
    { style: { color: "red" } },
    { default: () => `请${String(seconds).padStart(2, "00")}秒后再获取验证码` }
  );
};
function timeUp() {
  active.value = false;
}
function focusPhone() {
  phoneSelect.value = true;
}
function blurPhone() {
  const regu = /^1[3-9][0-9]{9}$/;
  if (phone.value === "") {
    showTips.value = true;
    message.value = "手机号不能为空";
    messageStyle.value = {
      color: "#F56C6C",
      background: "#FFEEE6",
      border: "1px solid #FFEBCC",
    };
  }
  if (!regu.test(phone.value)) {
    showTips.value = true;
    message.value = "手机号码格式不正确";
    messageStyle.value = {
      color: "#F56C6C",
      background: "#FFEEE6",
      border: "1px solid #FFEBCC",
    };
  }
  phoneSelect.value = false;
}
function focusCode() {
  if (phone.value === "") {
    showTips.value = true;
    messageStyle.value = {
      color: "#FF9900",
      background: "#FFF5E6",
      border: "1px solid #FFEBCC",
    };
    message.value = "请先输入手机号码";
  }
  codeSelect.value = true;
}
function blurCode() {
  codeSelect.value = false;
}
function tologin() {
  Router.push("/dashboard/console");
}
function getCode() {}
async function userRegister() {
  Router.push("/dashboard/console");
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
.suffix1 {
  font-size: 12px;
  font-family: "PingFangSC-Regular", "PingFang SC", sans-serif;
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
.tips1 {
  margin-top: 5rem;
  text-align: center;
  width: 35rem;
  height: 4rem;
  border-radius: 4px;
  line-height: 4rem;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  font-weight: 400;
}
</style>
