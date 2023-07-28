<template>
  <el-card>
    <el-descriptions title="计划详情" class="descriptions" :column="2" :border="true">
      <el-descriptions-item label="名称">{{ info.name }}</el-descriptions-item>
      <el-descriptions-item label="描述">{{ info.desc }}</el-descriptions-item>
      <el-descriptions-item label="模块">{{ info.module?.name }}</el-descriptions-item>
      <el-descriptions-item label="标签">
        <el-tag size="small" class="tag" v-for="label in info.label" :key="label.id">{{ label.name }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="更新者">{{ info.update_user }}</el-descriptions-item>
      <el-descriptions-item label="创建者">{{ info.create_user }}</el-descriptions-item>
    </el-descriptions>
    <el-card header="全局变量">
      <el-table :data="variableTable">
        <el-table-column prop="key" label="变量名称" />
        <el-table-column prop="value" label="变量值" />
      </el-table>
    </el-card>
    <el-card header="用例列表">
      <case-table :plan-id="info.id" :only-id="true" />
    </el-card>
  </el-card>
</template>

<script lang="ts" name="planManage" setup>
import { Plan } from "@/api/case/types/case"
import caseTable from "@/views/case-manage/caseTable.vue"
import { toRefs, ref, onBeforeMount, onMounted } from "vue"
const props = defineProps<{
  info: Plan
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
