<script lang="ts" name="caseManage" setup>
import Table from "@/components/Table/index.vue"
import { reactive, ref, toRefs, onUnmounted } from "vue"
import { getStepListApi } from "@/api/case"
import { Step } from "../../api/case/types/case"

const props = defineProps({
  caseId: {
    type: Number,
    default: null
  },
  onlyId: {
    type: Boolean,
    default: false
  }
})

const { caseId } = toRefs(props)
onUnmounted(() => {
  // tableData.list = []
})
const multipleSelection = ref<Step[]>([])
const handleSelectionChange = (val: Step[]) => {
  multipleSelection.value = val
}

const searchData = reactive({
  id: null,
  name: null,
  desc: null,
  caseId: caseId,
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
</script>

<template>
  <Table
    :search-data="searchData"
    :get-table-data-api="getStepListApi"
    :current-page="searchData.currentPage"
    :size="searchData.size"
    :handle-current-change="handleCurrentChange"
    :handle-size-change="handleSizeChange"
    :selection-change="handleSelectionChange"
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
    <template #tools />
    <template #default>
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column prop="id" label="编号" width="80" align="center" />
      <el-table-column prop="name" label="名称" align="center" />
      <el-table-column prop="desc" label="描述" align="left" />
    </template>
  </Table>
</template>

<style lang="scss" scoped></style>
