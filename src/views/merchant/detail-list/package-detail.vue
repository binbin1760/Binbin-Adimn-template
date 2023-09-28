<template>
  <div class="package-detail">
    <div class="package-info">
      <div class="tilte">团购套餐资料</div>
      <div class="info">
        <div class="categories">
          团购分类：
          <div v-for="(item, index) in data?.categories" :key="index">
            {{ getCategories(item) }}
          </div>
        </div>
        <div>团购名称：{{ data?.name }}</div>
        <div class="box">
          团购主图：
          <div class="img-box">
            <n-image width="220.5" height="147" :src="theme" />
          </div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="package-price">
      <div class="title">团购套餐售价(元)</div>
      <div class="price-box">
        <div>原价：{{ originalPrice }}</div>
        <div>折扣价格：{{ discountedPrice }}</div>
      </div>
    </div>
    <div v-for="(item, index) in sections" :key="index">
      <div class="divider"></div>
      <div class="detail">
        <div class="title">团购套餐详情</div>
        <div class="detail-box">
          <div class="content">{{ item.content }}</div>
          <div class="img-box" v-if="item.media.path !== ''">
            <n-image width="220.5" height="147" :src="item.media.path" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="data?.stat === 3" class="reason">
      未通过原因:{{ data?.approvalDisableReason }}
    </div>

    <div class="button-list" v-if="data?.stat == 1">
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
        @click="openModal"
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
        @click="pass"
        >通过</n-button
      >
    </div>

    <n-modal v-model:show="showModal">
      <n-card
        style="width: 600px"
        title="拒绝原因"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <n-input
          v-model:value="refuseReason"
          type="textarea"
          placeholder="请输入拒绝理由（注意文明用语!）"
        />
        <div class="confirm">
          <n-button color="#409EFF" :bordered="false" @click="refuse"
            >确认</n-button
          >
          <n-button color="#E7E7E7" :bordered="false" @click="closeModal"
            >取消</n-button
          >
        </div>
      </n-card>
    </n-modal>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { merchant } from "@/api";
import { downloadCosObj } from "@/utils";
import { packageDetail, Sections } from "./types";
import { ApprovalRequest, ApprovalStat } from "@/protoJs";
const Router = useRouter();
const Route = useRoute();
const id = Route.query.id as string;
const data = ref<Partial<packageDetail>>();
const theme = ref<string>();
const sections = ref<Array<Sections>>([]);
const showModal = ref<boolean>(false);
const refuseReason = ref<string>();

const originalPrice = ref<string>();
const discountedPrice = ref<string>();

async function getpackageDetail() {
  const result = await merchant.packageDetail(id as string);

  originalPrice.value = showMoney(result.toObject().originalPrice as number);
  discountedPrice.value = showMoney(
    result.toObject().discountedPrice as number
  );

  theme.value = await downloadCosObj(result.toObject().theme?.path as string);

  data.value = result.toObject() as unknown as packageDetail;
  for (const data of result.toObject().sections as unknown as Array<Sections>) {
    if (data.media?.path !== "") {
      data.media.path = await downloadCosObj(data.media?.path as string);
    }
    sections.value?.push(data);
  }
}
function getCategories(value: number) {
  switch (value) {
    case 1:
      return "洗澡";
      break;
    case 2:
      return "美容";
      break;
    case 3:
      return "上门服务";
      break;
    default:
      return "未知";
      break;
  }
}

async function refuse() {
  const req = new ApprovalRequest({
    stat: ApprovalStat._ApprovalStat_DISABLED,
    reason: refuseReason.value,
  });
  const result = await merchant.packageApproval(id, req);
  if (result.toObject()) {
    Router.push("/merchant-service/package");
  }
}
async function pass() {
  const req = new ApprovalRequest({
    stat: ApprovalStat._ApprovalStat_APPROVED,
  });
  const result = await merchant.packageApproval(id, req);
  if (result.toObject()) {
    Router.push("/merchant-service/package");
  }
}
function openModal() {
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}
function showMoney(num: number) {
  return num.toString().replace(/\d+/, function (n) {
    return n.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
  });
}
getpackageDetail();
</script>
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
      .categories {
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
  .reason {
    padding: 2.4rem 0 0 6.5rem;
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
  .confirm {
    margin-top: 1.6rem;
    display: flex;
    justify-content: center;
    gap: 3.2rem;
  }
  .divider {
    width: 100%;
    height: 1px;
    background-color: #e7e7e7;
  }
}
.confirm {
  margin-top: 1.6rem;
  display: flex;
  justify-content: center;
  gap: 3.2rem;
}
</style>
