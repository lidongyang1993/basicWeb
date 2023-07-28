<template>
  <ElCard>
    <el-descriptions title="用例详情" class="descriptions" :column="2" :border="true">
      <el-descriptions-item label="名称">{{ info.name }}</el-descriptions-item>
      <el-descriptions-item label="描述">{{ info.desc }}</el-descriptions-item>
      <el-descriptions-item label="模块">{{ info.module?.name }}</el-descriptions-item>
      <el-descriptions-item label="标签">
        <el-tag size="small" class="tag" v-for="label in info.label" :key="label.id">{{ label.name }}</el-tag>
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
    <ElCard header="步骤列表">
      <StepTable :case-id="Number(info.id)" :only-id="true" />
    </ElCard>
  </ElCard>
</template>

<script lang="ts" name="planManage" setup>
import { Case } from "@/api/case/types/case"

import StepTable from "@/views/case-manage/stepTable.vue"
import { toRefs, ref, onBeforeMount, onMounted } from "vue"
const props = defineProps<{
  info: Case
}>()

const { info } = toRefs(props)

const variableTable = ref<object[]>([])
const makeTable = () => {
  for (const vars in props.info.variable) {
    variableTable.value.push({ key: vars, value: props.info.variable[vars] })
  }
}

onBeforeMount(() => {
  makeTable()
})

onMounted(() => {})
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
.tag {
  margin-left: 10px;
}
</style>
