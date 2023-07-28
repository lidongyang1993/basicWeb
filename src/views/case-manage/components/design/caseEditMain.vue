<template>
  <el-card class="edit-card">
    <plan-line :info="info" />
  </el-card>
</template>
<script lang="ts" name="planManage" setup>
import { Plan } from "@/api/case/types/case"
import { onMounted, toRefs } from "vue"

import planLine from "./planLine.vue"

const props = defineProps<{
  info: Plan
  info_id?: Number
  clear?: {
    type: Function
    default: () => {}
  }
  views?: {
    type: Function
    default: () => {}
  }
}>()

const { info } = toRefs(props)

onMounted(() => {})
</script>
<style lang="scss" scoped>
.edit-card {
  width: 100%;
  height: 100%;
}
</style>
