<template>
  <div class="breed">
    <div class="crud">
      <n-button size="large" color="#409EFF" @click="addBreedClass()"
        >新增类目</n-button
      >
      <n-button size="large" color="#409EFF" @click="addPet()"
        >新增品种</n-button
      >
    </div>
    <div class="breed-table-box">
      <div class="serch">
        <div class="serch-input">
          <div class="serch-select">
            <div class="select-label">类目赛选：</div>
            <n-select
              v-model:value="serchBreed"
              :options="breedOptions"
              placeholder="类目赛选"
              @update:value="filterData"
            />
          </div>
          <n-button color="#ff9b52" @click="reSet()">重置</n-button>
        </div>
      </div>
      <div class="breed-table">
        <DataTable
          :data="dataTemp"
          @get-row-key="getRowKeyArray"
          :columns="columns"
        />
      </div>
    </div>
    <n-modal v-model:show="addModal">
      <addBreed @close="closeModal"></addBreed>
    </n-modal>
    <n-modal v-model:show="add2Modal">
      <addpet @close="closeModal2"></addpet>
    </n-modal>
  </div>
</template>
<script setup lang="ts">
import { DataTableColumns } from "naive-ui";
import { petBreedType } from "./types";
import { addBreed, addpet } from "./components";
import { pets } from "@/api";
import { useRouter } from "vue-router";
const Router = useRouter();
// 获取数据
async function getBreedData() {
  const breedList = (await pets.classificationPet()).toObject().raws;
  const temp = breedList?.map((item) => {
    return { label: item.title, value: item.id };
  });
  breedOptions.value = temp;

  const list: Array<Partial<petBreedType>> = [];
  if (temp) {
    for (let i = 0; i < temp.length; i++) {
      const petList: Array<Partial<petBreedType>> = (
        await pets.getChildBreed(temp[i].value as string)
      ).toObject().raws as unknown as Array<Partial<petBreedType>>;
      petList?.forEach((item) => {
        item.breed = temp[i].label;
      });
      list.push(...petList);
    }
  }
  list.forEach((item, index) => {
    item.key = index;
  });
  data.value = list;
  dataTemp.value = data.value;
}
getBreedData();

// modal
const addModal = ref<boolean>(false);
const add2Modal = ref<boolean>(false);

// select options
const breedOptions = ref();
const serchBreed = ref<string | null>(null);
//  data-table 配置
const columnsCreate = (): DataTableColumns<petBreedType> => [
  { title: "所属类目", key: "breed", align: "center", width: 100 },
  { title: "品种名称", key: "title", align: "center", width: 200 },
  // {
  //   title: "状态",
  //   key: "status",
  //   align: "center",
  //   width: 50,
  //   render(row) {
  //     return h(
  //       NTag,
  //       {
  //         style: { padding: "0 1.6rem", height: "2.5rem", textAlign: "center" },
  //         color: row.status
  //           ? { color: "#409EFF", textColor: "#ffff" }
  //           : { color: "#F56D6D", textColor: "#ffff" },
  //         bordered: false,
  //         round: true,
  //       },
  //       { default: () => (row.status ? "启用中" : "禁用中") }
  //     );
  //   },
  // },
  {
    title: "操作",
    key: "operate",
    align: "center",
    width: 225,
    render(row) {
      const list = [
        // h(
        //   "span",
        //   {
        //     onClick: () => openModal(),
        //     style: { color: "#165DFF", cursor: "pointer", marginRight: "1rem" },
        //   },
        //   { default: () => (row.status ? "禁用" : "启用") }
        // ),
        h(
          "span",
          {
            onClick: () => toDetailpage(row.id),
            style: { color: "#165DFF", cursor: "pointer", marginRight: "1rem" },
          },
          { default: () => "编辑" }
        ),
        h(
          "span",
          {
            style: { color: "#165DFF", cursor: "pointer", marginRight: "1rem" },
          },
          { default: () => "查看详情" }
        ),
        h(
          "span",
          {
            onClick: () => delpet(row.id, row.key),
            style: { color: "#165DFF", cursor: "pointer", marginRight: "1rem" },
          },
          { default: () => "删除" }
        ),
      ];
      return list;
    },
  },
];
const checklist = ref();
const columns = columnsCreate();
const data = ref<Array<Partial<petBreedType>>>([]);
const dataTemp = ref<Array<Partial<petBreedType>>>([]);
function getRowKeyArray(e: any) {
  checklist.value = e;
}
function filterData(value: string) {
  const list = data.value.filter((item) => {
    if (item.pid === value) {
      return item;
    }
  });
  dataTemp.value = list;
}
function reSet() {
  serchBreed.value = null;
  dataTemp.value = data.value;
}
function toDetailpage(id: string) {
  console.log(Router.options);
  Router.push({
    path: "/pet-service/petbreed/detail",
    query: {
      id,
    },
  });
}
// 模态框
function closeModal() {
  addModal.value = false;
}
function closeModal2() {
  add2Modal.value = false;
}
//宠物品类操作
function addBreedClass() {
  addModal.value = true;
}
function addPet() {
  add2Modal.value = true;
}
async function delpet(id: string, key: number) {
  const result = await pets.delpet(id);
  if (result.toObject().value) {
    data.value.splice(key, 1);
  }
}
</script>
<style scoped lang="less">
.breed {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  height: 100%;
  .crud {
    display: flex;
    align-items: center;
    gap: 1.6rem;
  }
  .breed-table-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    width: 124rem;
    .serch {
      display: flex;
      flex-direction: column;
      gap: 3.2rem;
      width: 123.2rem;
      .serch-input {
        display: flex;
        gap: 1.6rem;
        .serch-select {
          width: 40rem;
          display: flex;
          align-items: center;
          font-size: 1.6rem;
          .select-label {
            width: 10rem;
          }
        }
      }
      .qerry-button {
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 1.6rem;
      }
    }
    .breed-table {
      border-top: 1px solid #efeff5;
    }
  }
  .pageination {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: 2rem;
    color: #999999;
    .page-total {
      padding-right: 4.5rem;
      .total-number {
        margin: 0 5px;
      }
    }
  }
}
</style>
