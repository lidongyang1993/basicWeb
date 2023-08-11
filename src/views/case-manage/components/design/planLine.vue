<template>
  <div>
    <el-card>
      <el-descriptions size="small" :column="2" :border="true" @click="debug" @dblclick="dialog = true">
        <el-descriptions-item label="计划名称">
          <el-input v-model="info.name" />
        </el-descriptions-item>
        <el-descriptions-item label="描述">
          <el-input v-model="info.desc" />
        </el-descriptions-item>
        <el-descriptions-item label="模块">
          <el-select v-model="info.module_id" @change="changeModel">
            <el-option v-for="item in moduleOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item label="标签">
          <el-select v-model="info.label_id_list" multiple @change="changeLableList">
            <el-option v-for="item in labelOptions" :key="item.id" :label="item.name" :value="item.id"
          /></el-select>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-collapse>
      <el-card class="card-el">
        <Draggable
          chosen-class="choose"
          ghost-class="ghost"
          :list="info.case"
          :force-fallback="true"
          :delay="300"
          :animation="200"
          :item-key="String(add_id)"
        >
          <template #item="{ element, index }">
            <div class="un-choose case">
              <el-form-item v-if="element" size="small">
                <caseLine
                  :info="element"
                  :case-index="index"
                  :delete-case="deleteCase"
                  :copy-case="copyCase"
                  class="w-100%"
                />
              </el-form-item>
            </div>
          </template>
        </Draggable>

        <div class="tools-but">
          <el-button icon="plus" size="small" @click="add_case_list">用例</el-button>
        </div>
      </el-card>
    </el-collapse>
    <el-dialog v-model="dialog" :destroy-on-close="true">
      <el-descriptions size="small" :column="2" :border="true">
        <el-descriptions-item label="计划名称">
          {{ info.name }}
        </el-descriptions-item>
        <el-descriptions-item label="描述">
          {{ info.desc }}
        </el-descriptions-item>
        <el-descriptions-item label="模块">
          {{ info.module?.name }}
        </el-descriptions-item>
        <el-descriptions-item label="标签">
          <el-tag size="small" v-for="label in info.label" :key="label.id">{{ label.name }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="1" :border="true" direction="vertical">
        <el-descriptions-item label="全局变量">
          <JsonEditorVue v-model:modelValue="info.variable" />
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Plan, Module, Label } from "@/api/case/types/case"
import { onMounted, ref, toRefs } from "vue"
import { getLabelListApi, getModuleListApi, deepClone } from "@/api/case"
import caseLine from "./caseLine.vue"
import Draggable from "vuedraggable"
import JsonEditorVue from "json-editor-vue3"
const props = defineProps<{
  info: Plan
}>()
const { info } = toRefs(props)

const id_list = []
const add_id = ref(0)
const dialog = ref(false)

const debug = () => {
  console.log(info)
}

const deleteCase = (index: number) => {
  if (info.value.case !== undefined) {
    info.value.case.splice(index, 1)
  }
}
const copyCase = (index: number) => {
  if (info.value.case !== undefined) {
    console.log(info.value.case[Number(index)])
    // const new_case = { ...info.value.case[Number(index)] }
    const new_case = deepClone(info.value.case[Number(index)])
    new_case.id = undefined
    info.value.case.splice(index + 1, 0, new_case)
  }
}
const changeLableList = () => {
  info.value.label = []
  info.value.label_id_list?.forEach((label_id) => {
    const label = labelOptions.value.find((item) => item.id === label_id)
    if (label !== undefined) {
      info.value.label?.push(label)
    }
  })
}

const changeModel = () => {
  info.value.module = moduleOptions.value.find((item) => item.id === info.value.module_id)
}

const add_case_list = () => {
  if (info.value.case === undefined) {
    info.value.case = []
  }

  if (id_list.length !== 0) {
    add_id.value = id_list.length + 1
    id_list.push(add_id)
  }
  const defalutData = {
    label: "测试用例",
    type: "case",
    info: {
      name: "",
      desc: "",
      create_user: "",
      update_user: "",
      variable: {}
    }
  }

  info.value.case.push(defalutData.info)
}

defineEmits(["update:info"])

const moduleOptions = ref<Module[]>([])

const labelOptions = ref<Label[]>([])

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

onMounted(() => {
  getLabelListAll()
  getModuleListAll()
})
</script>
<style lang="scss">
.card-el {
  width: 100%;
}
.choose {
  background-color: #e2dede;
  opacity: 1;
  border: solid 1px #6200ff !important;
}
.ghost {
  border: solid 1px rgb(239, 19, 30) !important;
}
.un-choose {
  background-color: #fbfbfb;
  opacity: 1;
}
.case {
  border: solid 1px #ead5d5;
}
.step {
  border: solid 1px #d7f3d7;
}
.handler {
  border: solid 1px #b4f5f3;
}
.tools-but {
  margin-top: 0px;
  display: flex;
  justify-content: space-between;
}
.widget-view {
  margin: center;
}
.input-handlers {
  display: flex;
  justify-content: space-between;
}
</style>
