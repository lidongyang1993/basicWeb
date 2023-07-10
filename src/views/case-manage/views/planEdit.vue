<template>
  <ElCard>
    <el-descriptions title="计划详情" class="descriptions" :column="2" :border="true">
      <el-descriptions-item label="名称">
        <el-input v-model="info.name" />
      </el-descriptions-item>
      <el-descriptions-item label="描述">
        <el-input v-model="info.desc" />
      </el-descriptions-item>
      <el-descriptions-item label="模块">
        <el-select v-model="module" @change="changeModelList">
          <el-option v-for="item in moduleOptions" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="标签">
        <el-select v-model="labelList" multiple @change="changeLableList">
          <el-option v-for="item in labelOptions" :key="item.id" :label="item.name" :value="item.id"
        /></el-select>
      </el-descriptions-item>
      <el-descriptions-item label="更新者">{{ info.update_user }}</el-descriptions-item>
      <el-descriptions-item label="创建者">{{ info.create_user }}</el-descriptions-item>
    </el-descriptions>
    <ElCard header="全局变量">
      <ElTable :data="variableTable">
        <el-table-column prop="key" label="变量名称" />
        <el-table-column prop="value" label="变量值" />
      </ElTable>
    </ElCard>
    <ElCard header="用例列表">
      <CaseTable :plan-id="info.id" :only-id="true" />
    </ElCard>
  </ElCard>
</template>

<script lang="ts" name="planManage" setup>
import { Plan, Module, Label } from "../../../api/case/types/case"
import CaseTable from "../../case-manage/caseTable.vue"
import { toRefs, ref, onBeforeMount, onMounted } from "vue"

import { getLabelListApi, getModuleListApi } from "@/api/case"
const props = defineProps<{
  info: Plan
}>()

const { info } = toRefs(props)

const variableTable = ref<object[]>([])
const makeVariableTable = () => {
  for (const vars in props.info.variable) {
    variableTable.value.push({ key: vars, value: props.info.variable[vars] })
  }
}
const makeLabelAndModule = () => {
  info.value.label.forEach((value) => {
    labelList.value.push(value.id)
  })
  // labelOptions.value = info.value.label
  // moduleOptions.value = [info.value.module]
}

const getLabelListAll = () => {
  getLabelListApi({}).then((res) => {
    labelOptions.value = res.data.dataList
  })
}
const getModuleListAll = () => {
  getModuleListApi({}).then((res) => {
    moduleOptions.value = res.data.dataList
  })
}

const labelList = ref<number[]>([])
const module = ref<number>(info.value.module?.id)
const moduleOptions = ref<Module[]>([])
const labelOptions = ref<Label[]>([])
onBeforeMount(() => {
  makeLabelAndModule()
})

const changeLableList = () => {
  console.log(labelList)
}
const changeModelList = () => {
  console.log(module)
}

onMounted(() => {
  // makeLabelAndModule()
  makeVariableTable()
  getLabelListAll()
  getModuleListAll()
})
</script>
<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.descriptions {
  margin-bottom: 20px;
}
</style>
