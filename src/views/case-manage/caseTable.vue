<template>
  <div>
    <Table
      :search-data="searchData"
      :get-table-data-api="getCaseListApi"
      :current-page="searchData.currentPage"
      :size="searchData.size"
      :handle-current-change="handleCurrentChange"
      :handle-size-change="handleSizeChange"
      :select-change="handleSelectionChange"
    >
      <template #search>
        <el-form-item prop="id" label="id" v-if="!props.onlyId">
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
        <el-table-column prop="id" label="编号" width="80" align="center" />
        <el-table-column prop="name" label="名称" align="center" />
        <el-table-column prop="desc" label="描述" align="left" />
      </template>
    </Table>
    <el-dialog v-model="dialog.visible" width="70%" v-if="dialog.visible">
      <CaseViews :info="caseInfo" v-if="dialog.title === '查看' && caseInfo" />

      <div v-if="dialog.title === '编辑'">
        <el-button @click="saveInfo">保存</el-button>
        <CaseLine :info="caseInfo" v-if="dialog.title === '编辑' && caseInfo" />
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" name="caseManage" setup>
import Table from "@/components/Table/index.vue"
import { reactive, ref, toRefs } from "vue"
import { getCaseListApi, getCaseDataApi, saveCaseDataApi } from "@/api/case"
import { Case } from "@/api/case/types/case"
import { alert_error } from "@/config/elMessage"
import Tools from "@/views/case-manage/components/tools.vue"
import CaseViews from "@/views/case-manage/components/views/caseViews.vue"
import CaseLine from "./components/design/caseLine.vue"
const props = defineProps({
  planId: {
    type: Number,
    default: null
  },
  onlyId: {
    type: Boolean,
    default: false
  }
})

const { planId } = toRefs(props)

const multipleSelection = ref<Case[]>([])
const handleSelectionChange = (val: Case[]) => {
  multipleSelection.value = val
}

const searchData = reactive({
  id: null,
  name: null,
  desc: null,
  planId: planId,
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

const dialog = reactive({
  visible: false,
  title: ""
})

const caseInfo = ref<Case>()

const getData = () => {
  if (multipleSelection.value.length !== 1) {
    alert_error("请选择且只选择一条数据")
    return
  }
  getCaseDataApi({ id: multipleSelection.value[0].id })
    .then((res: ApiResponseData<Case>) => {
      caseInfo.value = res.data
    })
    .catch(() => {})
    .finally(() => {
      dialog.visible = true
    })
}

const saveInfo = () => {
  saveCaseDataApi({ planId: multipleSelection.value[0].id, data: caseInfo.value })
    .then((res: ApiResponseData<{}>) => {
      console.log(res)
    })
    .catch(() => {})
    .finally(() => {
      dialog.visible = false
    })
}
</script>

<style lang="scss" scoped></style>
