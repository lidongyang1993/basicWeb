<template>
  <div>
    <el-card>
      <el-descriptions size="small" :column="2" :border="true" @dblclick="dialog = true">
        <el-descriptions-item label="用例名称">
          <el-input v-model="info.name" />
        </el-descriptions-item>
        <el-descriptions-item label="描述">
          <el-input v-model="info.desc" />
        </el-descriptions-item>
      </el-descriptions>
      <el-divider size="small" />
      <Draggable
        group="step-group"
        chosen-class="choose"
        ghost-class="ghost"
        :list="info.step"
        :force-fallback="true"
        :delay="300"
        :animation="200"
        :item-key="String(add_id)"
        @add="add_element($event)"
      >
        <template #item="{ element, index }">
          <div class="un-choose step">
            <el-form-item v-if="element" size="small">
              <stepLine
                :info="element"
                :step-index="index"
                :delete-step="deleteStep"
                :copy-step="copyStep"
                class="w-100%"
              />
            </el-form-item>
          </div>
        </template>
      </Draggable>
    </el-card>
    <div class="tools-but">
      <el-button icon="plus" size="small" @click="add_step_list">步骤</el-button>
      <div>
        <el-button icon="CopyDocument" size="small" @click="copyCase(caseIndex)" v-if="copyCase !== undefined"
          >复制用例</el-button
        >
        <el-button icon="delete" size="small" @click="deleteCase(caseIndex)" v-if="deleteCase !== undefined"
          >删除用例</el-button
        >
      </div>
    </div>
    <El-dialog v-model="dialog" :destroy-on-close="true">
      <el-descriptions size="small" :column="2" :border="true">
        <el-descriptions-item label="计划名称">
          {{ info.name }}
        </el-descriptions-item>
        <el-descriptions-item label="描述">
          {{ info.desc }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="1" :border="true" direction="vertical">
        <el-descriptions-item label="局部变量">
          <JsonEditorVue v-model="info.variable" />
        </el-descriptions-item>
      </el-descriptions>
    </El-dialog>
  </div>
</template>

<script setup lang="ts">
import { Case } from "@/api/case/types/case"
import { deepClone } from "@/api/case"
import { onMounted, ref, toRefs } from "vue"
import Draggable from "vuedraggable"
import stepLine from "./stepLine.vue"
import JsonEditorVue from "json-editor-vue3"
const props = defineProps<{
  info: Case
  caseIndex?: Number
  deleteCase?: Function
  copyCase?: Function
}>()
defineEmits(["update:info", "update:caseIndex"])

const { info } = toRefs(props)
const dialog = ref(false)
const variableTable = ref<object[]>([])
const makeVariableTable = () => {
  for (const vars in props.info.variable) {
    variableTable.value.push({ key: vars, value: props.info.variable[vars] })
  }
}

const id_list = []
const add_id = ref(0)

const add_element = (event: any) => {
  console.log(event)
}

const add_step_list = () => {
  if (info.value.step === undefined) {
    info.value.step = []
  }
  if (id_list.length !== 0) {
    add_id.value = id_list.length + 1
    id_list.push(add_id)
  }
  const defalutStep = {
    label: "用例步骤",
    type: "step",
    info: {
      name: "",
      desc: "",
      type: "",
      sleep: 0,
      params: {},
      retry: {},
      handlers: []
    }
  }

  info.value.step.push(defalutStep.info)
}
const deleteStep = (index: number) => {
  info.value.step?.splice(index, 1)
}

const copyStep = (index: number) => {
  if (info.value.step !== undefined) {
    info.value.step.splice(index, 0, deepClone(info.value.step[Number(index)]))
  }
}

onMounted(() => {
  makeVariableTable()
})
</script>
<style lang="scss"></style>
