<template>
  <div>
    <el-descriptions size="small" :column="5" :border="true" @dblclick="dialog = true">
      <el-descriptions-item label="处理器-类型" width="15%">
        <el-select v-model="info.type" size="small">
          <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item" size="small" />
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="参数">
        {{ info.params }}
      </el-descriptions-item>
    </el-descriptions>
    <el-dialog v-model="dialog" :destroy-on-close="true">
      <el-descriptions size="small" :column="2" :border="true">
        <el-descriptions-item label="处理器-类型">
          {{ info.type }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="1" :border="true" direction="vertical">
        <el-descriptions-item label="处理器-参数">
          <JsonEditorVue v-model="info.params" class="h-400px" />
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs } from "vue"
import JsonEditorVue from "json-editor-vue3"
import { Handler } from "@/api/case/types/case"
const props = defineProps<{
  info: Handler
}>()
defineEmits(["update:info"])

const typeOptions = ["asserts", "extract", "calculate", "ext_asserts"]
// const funcAssertsOptions = ["==", ">=", "<=", "!=", "in"]

const { info } = toRefs(props)
const dialog = ref(false)
onMounted(() => {
  console.log(info)
})
</script>
<style lang="scss"></style>
