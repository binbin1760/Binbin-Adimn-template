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
          <div class="value">511234199819198192</div>
        </div>
        <div class="info-item">
          <div class="key">银行卡号：</div>
          <div class="value">6217 0055 1232 1245</div>
        </div>
        <div class="info-item">
          <div class="key">银行名称：</div>
          <div class="value">中国招商银行</div>
        </div>
        <div class="info-item">
          <div class="key">开户行：</div>
          <div class="value">四川省成都市高新区天府二街支行</div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="money">
      <div class="info-box">
        <div class="info-item">
          <div class="key">提现级呢（元）：</div>
          <div class="value">6,882.88</div>
        </div>
        <div class="info-item">
          <div class="key">交易号：</div>
          <div class="value">53289112341234</div>
        </div>
        <div class="info-item">
          <div class="key">申请时间：</div>
          <div class="value">2023-12-19 23:12:12</div>
        </div>
      </div>
    </div>
    <div class="button-list">
      <n-button
        color="#F9D7D9"
        :style="{
          fontSize: '18px',
          fontWeight: '500',
          width: '10rem',
          height: '4rem',
        }"
        :bordered="false"
        text-color="#E34D59"
        >拒绝</n-button
      >
      <n-button
        color="#BCEBDC"
        :style="{
          fontSize: '18px',
          fontWeight: '500',
          width: '10rem',
          height: '4rem',
        }"
        :bordered="false"
        text-color="#078D5C"
        >通过</n-button
      >
    </div>
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
  .info {
    padding: 4rem 0 3.5rem 6.5rem;
    .title {
      font-size: 18px;
      color: rgba(22, 22, 22, 0.9);
    }
  }
  .money {
    padding: 0 0 3.5rem 6.5rem;
  }
  .button-list {
    margin-top: 17.2rem;
    display: flex;
    justify-content: center;
    gap: 8.2rem;
    padding-bottom: 16rem;
    font-family: PingFangSC-Medium;
    font-size: 18px !important;
    font-weight: 500;
  }
  .divider {
    width: 100%;
    height: 1px;
    background-color: #e7e7e7;
  }
}
</style>
