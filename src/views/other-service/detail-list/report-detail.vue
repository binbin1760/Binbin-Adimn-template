<template>
  <div class="detail">
    <div class="box">
      <div class="item">
        <div>举报详情：</div>
        <div>聊天信息</div>
      </div>
      <div class="item">
        <div>被举报人：</div>
        <div>用户8848</div>
      </div>
      <div class="item">
        <div>举报类型：</div>
        <div>侮辱谩骂</div>
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
        <div>聊天信息</div>
      </div>
      <div class="item">
        <div>提交时间：</div>
        <div>聊天信息</div>
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
