<template>
  <div>
    <Table
      :search-data="searchData"
      :get-table-data-api="getPlanListApi"
      :current-page="searchData.currentPage"
      :size="searchData.size"
      :handle-current-change="handleCurrentChange"
      :handle-size-change="handleSizeChange"
      :select-change="handleSelectionChange"
    >
      <template #search>
        <el-form-item prop="id" label="id">
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
        <div class="tools-but">
          <Tools :dialog="dialog" :get-data="getData" />
        </div>
      </template>
      <template #tools-right>
        <el-button type="primary" @click="addCase">添加用例</el-button>
      </template>
      <template #default>
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="id" label="编号" width="120" align="center" />
        <el-table-column prop="name" label="名称" align="center" />
        <el-table-column prop="desc" label="描述" align="left" />
        <el-table-column prop="create_user" width="100" label="创建者" align="left" />
        <el-table-column prop="update_user" width="100" label="更新者" align="left" />
      </template>
    </Table>
    <el-dialog v-model="dialog.visible" width="70%" v-if="dialog.visible">
      <plan-views :info="planInfo.data" v-if="dialog.title === '查看'" />
      <div v-if="dialog.title === '添加'">
        <el-button @click="addPlan">保存</el-button>
        <PlanLine :info="new_plan_info" />
      </div>
      <div v-if="dialog.title === '编辑'">
        <el-button @click="saveInfo">保存</el-button>
        <el-button @click="debugPlan">调试</el-button>
        <PlanLine :info="planInfo.data" />
      </div>
      <div v-if="dialog.title === '预览'">
        <el-button @click="saveInfo">保存</el-button>
        <el-button @click="debugPlan">调试</el-button>
        <JsonEditorVue v-model="planInfo.data" class="h-800px" />
      </div>
      <div v-if="dialog.title === '添加用例'">
        <el-button @click="saveCase">保存</el-button>
        <CaseLine :info="newCase" v-if="dialog.title === '添加用例'" />
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" name="planManage" setup>
import Table from "@/components/Table/index.vue"
import { reactive, ref } from "vue"
import {
  getPlanListApi,
  getPlanDataApi,
  savePlanDataApi,
  addCaseDataApi,
  addPlanDataApi,
  debugCaseApi
} from "@/api/case"
import { Plan, Case } from "@/api/case/types/case"
import { alert_error, alert_info } from "@/config/elMessage"

import planViews from "@/views/case-manage/components/views/planViews.vue"
import Tools from "@/views/case-manage/components/tools.vue"
import PlanLine from "@/views/case-manage/components/design/planLine.vue"
import CaseLine from "./components/design/caseLine.vue"
import JsonEditorVue from "json-editor-vue3"

const searchData = reactive({
  id: null,
  name: null,
  desc: null,
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

const saveInfo = () => {
  savePlanDataApi({ data: planInfo.data })
    .then((res: ApiResponseData<{}>) => {
      console.log(res)
    })
    .catch(() => {})
    .finally(() => {
      dialog.visible = false
    })
}

const newCase = ref<Case>({
  name: "",
  desc: "",
  update_user: "",
  create_user: ""
})

const multipleSelection = ref<Plan[]>([])
const handleSelectionChange = (val: Plan[]) => {
  multipleSelection.value = val
}

const planInfo = reactive({
  data: {
    name: "",
    desc: "",
    create_user: "",
    update_user: ""
  }
})

const new_plan_info = ref({
  name: "",
  desc: "",
  create_user: "",
  update_user: ""
})

const dialog = reactive({
  visible: false,
  title: ""
})

const getData = () => {
  if (dialog.title == "添加") {
    return
  }

  if (multipleSelection.value.length !== 1) {
    alert_error("请选择且只选择一条数据")
    return
  }

  getPlanDataApi({ id: multipleSelection.value[0].id })
    .then((res: ApiResponseData<Plan>) => {
      planInfo.data = res.data
    })
    .catch(() => {})
    .finally(() => {
      dialog.visible = true
    })
}

const addPlan = () => {
  console.log(new_plan_info.value)
  addPlanDataApi({ data: new_plan_info.value })
    .then((res: ApiResponseData<Plan>) => {
      console.log(res.data)
    })
    .catch(() => {})
    .finally(() => {
      dialog.visible = false
    })
}

const addCase = () => {
  dialog.title = "添加用例"

  if (multipleSelection.value.length !== 1) {
    alert_error("请选择且只选择一条数据")
    return
  } else dialog.visible = true
}

const saveCase = () => {
  addCaseDataApi({ planId: multipleSelection.value[0].id, data: newCase.value })
    .then((res: ApiResponseData<{}>) => {
      console.log(res)
    })
    .catch(() => {})
    .finally(() => {
      dialog.visible = false
    })
}

const debugPlan = () => {
  debugCaseApi({ data: planInfo.data })
    .then((res) => {
      if (res) {
        if (res.code === 0) {
          if (res.data.result === false) {
            alert_info("cheack-失败")
          } else {
            alert_info("debug-完成")
            window.open(res.data.log_url)
          }
        } else {
          alert_error("debug-失败")
        }
      }
    })
    .catch(() => {})
    .finally(() => {})
}
</script>

<style lang="scss" scoped>
.tools-but {
  margin-top: 0px;
  display: flex;
  justify-content: space-between;
}
</style>
