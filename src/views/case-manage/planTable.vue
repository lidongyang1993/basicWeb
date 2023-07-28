<template>
  <div>
    <Table
      :search-data="searchData"
      :get-table-data-api="getPlanListApi"
      :current-page="searchData.currentPage"
      :size="searchData.size"
      :handle-current-change="handleCurrentChange"
      :handle-size-change="handleSizeChange"
      :select-change="handleSelectionChange"
    >
      <template #search>
        <el-form-item prop="id" label="id">
          <el-input v-model="searchData.id" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="name" label="名称">
          <el-input v-model="searchData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="desc" label="描述">
          <el-input v-model="searchData.desc" placeholder="请输入" />
        </el-form-item>
      </template>
      <template #tools>
        <Tools :dialog="dialog" :get-data="getData" />
      </template>
      <template #default>
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="id" label="编号" width="120" align="center" />
        <el-table-column prop="name" label="名称" align="center" />
        <el-table-column prop="desc" label="描述" align="left" />
        <el-table-column prop="create_user" width="100" label="创建者" align="left" />
        <el-table-column prop="update_user" width="100" label="更新者" align="left" />
      </template>
    </Table>
    <el-dialog v-model="dialog.visible" width="70%" v-if="dialog.visible">
      <plan-views :info="planInfo.data" v-if="dialog.title === '查看'" />
      <div v-if="dialog.title === '编辑'">
        <el-button @click="saveInfo">保存</el-button>
        <PlanLine :info="planInfo.data" />
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" name="planManage" setup>
import Table from "@/components/Table/index.vue"
import { reactive, ref } from "vue"
import { getPlanListApi, getPlanDataApi, savePlanDataApi } from "@/api/case"
import { Plan } from "@/api/case/types/case"
import { alert_error } from "@/config/elMessage"

import planViews from "@/views/case-manage/components/views/planViews.vue"
import Tools from "@/views/case-manage/components/tools.vue"
import PlanLine from "@/views/case-manage/components/design/planLine.vue"

const searchData = reactive({
  id: null,
  name: null,
  desc: null,
  currentPage: 1,
  size: 10
})
const handleCurrentChange = (value: number, freshData: Function) => {
  searchData.currentPage = value
  freshData()
}
const handleSizeChange = (value: number, freshData: Function) => {
  searchData.size = value
  freshData()
}

const saveInfo = () => {
  savePlanDataApi({ data: planInfo.data })
    .then((res: ApiResponseData<{}>) => {
      console.log(res)
    })
    .catch(() => {})
    .finally(() => {
      dialog.visible = true
    })
}

const multipleSelection = ref<Plan[]>([])
const handleSelectionChange = (val: Plan[]) => {
  multipleSelection.value = val
}

const planInfo = reactive({
  data: {
    name: "",
    desc: "",
    create_user: "",
    update_user: ""
  }
})

const dialog = reactive({
  visible: false,
  title: ""
})

const getData = () => {
  if (multipleSelection.value.length !== 1) {
    alert_error("请选择且只选择一条数据")
    return
  }

  getPlanDataApi({ id: multipleSelection.value[0].id })
    .then((res: ApiResponseData<Plan>) => {
      planInfo.data = res.data
    })
    .catch(() => {})
    .finally(() => {
      dialog.visible = true
    })
}
</script>

<style lang="scss" scoped></style>
