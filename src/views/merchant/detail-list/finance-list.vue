<template>
  <div class="finance">
    <div class="info">
      <div class="title">提现信息</div>
      <div class="info-box">
        <div class="info-item">
          <div class="key">开户人姓名：</div>
          <div class="value">王麻子</div>
        </div>
        <div class="info-item">
          <div class="key">开户人身份证号 ：</div>
          <div class="value">王麻子</div>
        </div>
        <div class="info-item">
          <div class="key">银行卡号：</div>
          <div class="value">王麻子</div>
        </div>
        <div class="info-item">
          <div class="key">银行名称：</div>
          <div class="value">王麻子</div>
        </div>
        <div class="info-item">
          <div class="key">开户行：</div>
          <div class="value">王麻子</div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="money"></div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="less">
.finance {
  background: #ffffff;
  border-radius: 24px 24px 0 24px;
  display: flex;
  flex-direction: column;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  .info {
    padding: 4rem 0 3.5rem 6.5rem;
    .title {
      font-size: 18px;
      color: rgba(22, 22, 22, 0.9);
    }
    .info-box {
      margin-top: 2.8rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      .info-item {
        display: flex;
        font-size: 16px;
        color: rgba(22, 22, 22, 0.9);
        align-items: center;
        .key {
          font-size: 14px;
          color: #5e5e5e;
        }
      }
    }
  }

  .divider {
    width: 100%;
    height: 1px;
    background-color: #e7e7e7;
  }
}
</style>
