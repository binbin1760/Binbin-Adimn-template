<template>
  <div class="maerchant-info">
    <div class="shop-info">
      <div class="title">门店资料</div>
      <div class="info">
        <span>门店名称：{{ info.shop }}</span>
        <span>门店地址：{{ info.address }}</span>
        <span>门店电话：{{ info.phone }}</span>
        <span>营业时间：{{ info.time }}</span>
      </div>
    </div>
    <div class="divider"></div>
    <div class="shop-img">
      <div class="title">门头图</div>
      <div class="img-box"></div>
      <div class="other">补充说明:xxxxxxx</div>
    </div>
    <div class="divider"></div>
    <div class="shop-license-img">
      <div class="license-img">
        <div class="title">营业执照</div>
        <div class="img-box"></div>
      </div>
      <div class="Idcard">
        <div class="title">法人身份证明</div>
        <div class="box">
          <div class="idcard-info">
            <div class="img-box"></div>
            <div class="img-title">身份证正面</div>
          </div>
          <div class="idcard-info">
            <div class="img-box"></div>
            <div class="img-title">身份证反面</div>
          </div>
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
<script setup lang="ts">
import { ref } from "vue";

const info = ref({
  shop: "xxx",
  address: "四川省成都市武侯区东方天祥广场D5C座1202",
  phone: "156219339147",
  time: "周一至周日 09:00-20:00",
});
</script>
<style scoped lang="less">
.maerchant-info {
  background: #ffffff;
  border-radius: 24px 24px 0 24px;
  display: flex;
  flex-direction: column;
  .shop-info {
    padding: 4rem 0 3.5rem 6.5rem;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: rgba(22, 22, 22, 0.9);
    font-weight: 500;
    .info {
      font-size: 14px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 17.6rem;
      margin-top: 3.6rem;
      white-space: nowrap;
    }
  }
  .img-box {
    width: 22.05rem;
    height: 14.7rem;
    background-color: #cccc;
    margin-top: 1.3rem;
  }
  .shop-img {
    padding: 2.4rem 0 3.5rem 6.5rem;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: rgba(22, 22, 22, 0.9);
    font-weight: 500;
    .other {
      font-size: 14px;
      margin-top: 5.9rem;
    }
  }
  .shop-license-img {
    padding: 2.4rem 0 0 6.5rem;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: rgba(22, 22, 22, 0.9);
    font-weight: 500;
    display: flex;
    gap: 29.05rem;
    .box {
      display: flex;
      gap: 4.45rem;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #5e5e5e;
      font-weight: 500;
      text-align: center;
      .img-title {
        margin-top: 1.2rem;
      }
    }
  }
  .button-list {
    margin-top: 6.5rem;
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
