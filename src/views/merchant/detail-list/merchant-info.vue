<template>
  <div class="maerchant-info">
    <div class="shop-info">
      <div class="title">门店资料</div>
      <div class="info">
        <span>门店名称：{{ data?.name }}</span>
        <span
          >门店地址：{{ data?.address.country }}{{ data?.address.street }}</span
        >
        <div class="phone-box">
          门店电话：
          <div>
            <div v-for="(item, index) in data?.phoneNumber" :key="index">
              联系电话{{ index + 1 }}：{{ item }}
            </div>
          </div>
        </div>
        <div class="businessHours">
          <span>营业时间：</span>
          <div class="timeRange-list">
            <div v-for="(item, index) in data?.businessHours" :key="index">
              周{{ item.dayOfWeek }} {{ item.openingTime.hour }}:{{
                item.openingTime.minute
              }}:{{ item.openingTime.second }}:{{
                item.openingTime.nanoOfSecond
              }}
              -
              {{ item.closingTime.hour }}:{{ item.closingTime.minute }}:{{
                item.closingTime.second
              }}:{{ item.openingTime.nanoOfSecond }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="shop-img">
      <div class="title">门头图</div>
      <div class="img-box">
        <n-image width="220.5" height="147" :src="theme" />
      </div>
      <!-- <div class="other">补充说明:xxxxxxx</div> -->
    </div>
    <div class="divider"></div>
    <div class="shop-license-img">
      <div class="license-img">
        <div class="title">营业执照</div>
        <div class="img-box">
          <n-image width="220.5" height="147" :src="businessLicense" />
        </div>
      </div>
      <div class="Idcard">
        <div class="title">法人身份证明</div>
        <div class="box">
          <div class="idcard-info">
            <div class="img-box">
              <n-image width="220.5" height="147" :src="idCardfront" />
            </div>
            <div class="img-title">身份证正面</div>
          </div>
          <div class="idcard-info">
            <div class="img-box">
              <n-image width="220.5" height="147" :src="idCardopposite" />
            </div>
            <div class="img-title">身份证反面</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="data?.stat === 3" class="reason">
      未通过原因:{{ data?.approvalDisableReason }}
    </div>
    <div v-if="isEdit" class="button-list">
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
        @click="pass()"
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
        <div
          class="confirm"
          v-permission="'merchant:edit:admin-approval-(merchantId)'"
        >
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
import { useRoute, useRouter } from "vue-router";
import { merchant } from "@/api";
import { downloadCosObj } from "@/utils";
import { ApprovalRequest, ApprovalStat } from "@/protoJs";
const Route = useRoute();
const Router = useRouter();
const { id, isEdit } = JSON.parse(Route.query.data as unknown as string);
const data = ref();
const theme = ref();
const businessLicense = ref();
const idCardfront = ref();
const idCardopposite = ref();
const refuseReason = ref();
const showModal = ref<boolean>(false);
async function refuse() {
  const req = new ApprovalRequest({
    stat: ApprovalStat._ApprovalStat_DISABLED,
    reason: refuseReason.value,
  });
  const result = await merchant.examineMerchant(id, req);
  if (result.toObject().value) {
    Router.push("/merchant-service/examine");
  }
}
async function pass() {
  const req = new ApprovalRequest({
    stat: ApprovalStat._ApprovalStat_APPROVED,
  });
  const result = await merchant.examineMerchant(id, req);
  if (result.toObject().value) {
    Router.push("/merchant-service/examine");
  }
}
function openModal() {
  showModal.value = true;
}
function closeModal() {
  showModal.value = false;
  refuseReason.value = undefined;
}
onBeforeMount(async () => {
  merchant.merchantDetail(id).then(async (res) => {
    data.value = res.toObject();
    theme.value = await downloadCosObj(res.toObject().theme?.path as string);
    businessLicense.value = await downloadCosObj(
      res.toObject().businessLicense?.path as string
    );
    const identityDocuments = res.toObject()
      ?.identityDocuments as unknown as Array<Record<string, string>>;
    idCardfront.value = await downloadCosObj(
      identityDocuments[0].path as string
    );
    idCardopposite.value = await downloadCosObj(
      identityDocuments[1].path as string
    );
  });
});
</script>
<style scoped lang="less">
.maerchant-info {
  padding-bottom: 10rem;
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
      .phone-box {
        display: flex;
        align-items: center;
      }
      .businessHours {
        display: flex;
        align-items: center;
      }
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
  .reason {
    padding: 2.4rem 0 0 6.5rem;
  }
}
.confirm {
  margin-top: 1.6rem;
  display: flex;
  justify-content: center;
  gap: 3.2rem;
}
</style>
