<template>
  <div class="detail">
    <div class="box">
      <div class="item">
        <div>反馈类型：</div>
        <div>功能异常</div>
      </div>
      <div class="item">
        <div>问题场景：</div>
        <div>社区</div>
      </div>
      <div class="content">
        <div>描述：</div>
        <div class="text">场景描述</div>
      </div>
      <div class="img-box">
        <div>图片</div>
        <div class="img-list">
          <div class="img"></div>
          <div class="img"></div>
          <div class="img"></div>
          <div class="img"></div>
        </div>
      </div>
      <div class="item">
        <div>用户昵称：</div>
        <div>我是阿斌啊</div>
      </div>
      <div class="item">
        <div>联系方式：</div>
        <div>17608255452</div>
      </div>
      <div class="item">
        <div>反馈时间：</div>
        <div>2023-09-13 23:12:12</div>
      </div>
      <div class="item">
        <div>反馈平台：</div>
        <div>ios</div>
      </div>
      <div class="item">
        <div>反馈渠道：</div>
        <div>xxxxx</div>
      </div>
      <div class="item">
        <div>反馈机型：</div>
        <div>iPhone15</div>
      </div>
      <div class="item">
        <div>反馈版本：</div>
        <div>v1.3.3</div>
      </div>
      <div class="back">
        <n-button size="large" color="#266FE8">返回</n-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="less">
.detail {
  height: 100%;
  background-color: white;
  border-radius: 2.4rem 2.4rem 0 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.6rem 0;
  box-sizing: border-box;
  .box {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .item {
    display: flex;
    align-items: center;
    gap: 10rem;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    .text {
      width: 43rem;
      background-color: #f2f2f2;
      border-radius: 7px;
      padding: 1rem;
    }
  }
  .img-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    .img-list {
      width: 45rem;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      .img {
        width: 14.2rem;
        height: 13.9rem;
        background-color: #f2f2f2;
        border-radius: 7px;
      }
    }
  }
  .back {
    display: flex;
    justify-content: center;
  }
}
</style>
