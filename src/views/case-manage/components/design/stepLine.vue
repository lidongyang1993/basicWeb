<template>
  <div>
    <el-collapse-item :title="'第' + (stepIndex + 1) + '步：' + info.name">
      <el-descriptions size="small" :column="5" :border="true" @dblclick="dialog = true">
        <el-descriptions-item label="步骤名称">
          <el-input v-model="info.name" />
        </el-descriptions-item>
        <el-descriptions-item label="描述">
          <el-input v-model="info.desc" />
        </el-descriptions-item>
        <el-descriptions-item label="类型" width="10%">
          <el-select v-model="info.type" size="small">
            <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item" size="small" />
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item label="等待" width="5%">
          <el-input-number v-model="info.sleep" />
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions size="small" :column="5" :border="true" direction="vertical">
        <el-descriptions-item>
          <!-- <el-collapse> -->
          <!-- <el-collapse-item :title="'展开/收缩'"> -->
          <Draggable
            group="handler-group"
            chosen-class="choose"
            ghost-class="ghost"
            :list="info.handlers"
            :force-fallback="true"
            :delay="300"
            :animation="200"
            :item-key="String(add_id)"
            @add="add_element($event)"
          >
            <template #item="{ element, index }">
              <div class="un-choose">
                <el-form-item v-if="element" size="small">
                  <handlerLine :info="element" class="w-90%" />
                  <el-button icon="CopyDocument" size="small" @click="copyHandler(index)" />
                  <el-button icon="delete" size="small" @click="deleteHandler(index)" />
                </el-form-item>
              </div>
            </template>
          </Draggable>
          <!-- </el-collapse-item> -->
          <!-- </el-collapse> -->
        </el-descriptions-item>
      </el-descriptions>
    </el-collapse-item>
    <div class="tools-but">
      <el-button icon="plus" size="small" @click="add_handler_list">处理器</el-button>
      <div>
        <el-button icon="CopyDocument" size="small" @click="copyStep(stepIndex)">复制步骤</el-button>
        <el-button icon="delete" size="small" @click="deleteStep(stepIndex)">删除步骤</el-button>
      </div>
    </div>
    <el-dialog v-model="dialog" :destroy-on-close="true">
      <el-descriptions size="small" :column="2" :border="true">
        <el-descriptions-item label="名称">
          {{ info.name }}
        </el-descriptions-item>
        <el-descriptions-item label="描述">
          {{ info.desc }}
        </el-descriptions-item>
        <el-descriptions-item label="类型">
          {{ info.type }}
        </el-descriptions-item>
        <el-descriptions-item label="等待时间">
          {{ info.sleep }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="descriptions" :column="1" :border="true" direction="vertical">
        <el-descriptions-item label="重复尝试">
          <JsonEditorVue v-model="info.retry" />
        </el-descriptions-item>
        <el-descriptions-item label="请求/插件-具体参数">
          <JsonEditorVue v-model="info.params" h="500px" />
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Step } from "@/api/case/types/case"
import { onMounted, ref, toRefs } from "vue"
import JsonEditorVue from "json-editor-vue3"
import Draggable from "vuedraggable"
import handlerLine from "./handlerLine.vue"
const props = defineProps<{
  info: Step
  stepIndex: number
  deleteStep: Function
  copyStep: Function
}>()
defineEmits(["update:info"])
const typeOptions = ["request", "plugIn"]

const { info, stepIndex } = toRefs(props)
const dialog = ref(false)
const deleteHandler = (index: number) => {
  if (info.value.handlers !== undefined) {
    info.value.handlers.splice(index, 1)
  }
}
const copyHandler = (index: number) => {
  if (info.value.handlers !== undefined) {
    console.log(info.value.handlers[Number(index)])

    info.value.handlers.splice(index, 0, { ...info.value.handlers[Number(index)] })
  }
}
const id_list = []
const add_id = ref(0)
const add_handler_list = () => {
  if (info.value.handlers === undefined) {
    info.value.handlers = []
  }

  if (id_list.length !== 0) {
    add_id.value = id_list.length + 1
    id_list.push(add_id)
  }
  const defalutHandlers = {
    label: "后置处理器",
    type: "handlers",
    info: {
      type: "asserts",
      params: {
        value_left: "",
        func: "==",
        value_rignt: ""
      }
    }
  }

  info.value.handlers.push(defalutHandlers.info)
}
const add_element = (event: any) => {
  console.log(event)
}

onMounted(() => {
  console.log(info)
})
</script>
<style lang="scss"></style>
