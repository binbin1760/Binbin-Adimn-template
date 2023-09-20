<template>
  <div class="package-detail">
    <div class="package-info">
      <div class="tilte">团购套餐资料</div>
      <div class="info">
        <div>团购分类：洗澡</div>
        <div>团购名称：猫咪1-6kg洗护</div>
        <div class="box">
          团购主图：
          <div class="img-box"></div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="package-price">
      <div class="title">团购套餐售价(元)</div>
      <div class="price-box">
        <div>团购售价：88.00</div>
        <div>门店售价：99.00</div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="detail">
      <div class="title">团购套餐详情</div>
      <div class="detail-box">
        <div class="content">套餐文字说明。</div>
        <div class="img-box"></div>
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
.package-detail {
  background: #ffffff;
  border-radius: 24px 24px 0 24px;
  display: flex;
  flex-direction: column;
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: rgba(22, 22, 22, 0.9);
  font-weight: 500;
  .img-box {
    width: 22.05rem;
    height: 14.7rem;
    background-color: #eeee;
  }
  .package-info {
    padding: 4rem 0 3.2rem 6.5rem;
    .info {
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 36.4rem;
      margin-top: 2.8rem;
      .box {
        display: flex;
        align-items: center;
      }
    }
  }
  .package-price {
    padding: 4rem 0 3rem 6.5rem;
    .price-box {
      margin-top: 2.2rem;
      font-size: 14px;
      display: flex;
      gap: 34.9rem;
    }
  }
  .detail {
    padding: 4rem 0 3rem 6.5rem;
    .detail-box {
      margin-top: 2.4rem;
      display: flex;
      flex-direction: column;
      gap: 2.4rem;
      font-size: 14px;
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
