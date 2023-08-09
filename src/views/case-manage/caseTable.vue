<template>
  <div>
    <Table
      :search-data="searchData"
      :get-table-data-api="getCaseListApi"
      :current-page="searchData.currentPage"
      :size="searchData.size"
      :handle-current-change="handleCurrentChange"
      :handle-size-change="handleSizeChange"
      :select-change="handleSelectionChange"
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
      <template #tools>
        <Tools :dialog="dialog" :get-data="getData" />
      </template>
      <template #default>
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="id" label="编号" width="80" align="center" />
        <el-table-column prop="name" label="名称" align="center" />
        <el-table-column prop="desc" label="描述" align="left" />
      </template>
    </Table>
    <el-dialog v-model="dialog.visible" width="70%" v-if="dialog.visible">
      <CaseViews :info="caseInfo" v-if="dialog.title === '查看' && caseInfo" />

      <div v-if="dialog.title === '编辑'">
        <el-button @click="saveInfo">保存</el-button>
        <CaseLine :info="caseInfo" v-if="dialog.title === '编辑' && caseInfo" />
      </div>
      <div v-if="dialog.title === '预览'">
        <el-button @click="saveInfo">保存</el-button>
        <el-button @click="debugCase">调试</el-button>
        <JsonEditorVue v-model="caseInfo" v-if="dialog.title === '预览' && caseInfo" class="h-800px" />
      </div>
      <!-- <div v-if="dialog.title === '添加'">
        <el-button @click="saveInfo">保存</el-button>
        <CaseLine :info="newCase" v-if="dialog.title === '添加' && newCase" />
      </div> -->
    </el-dialog>
  </div>
</template>
<script lang="ts" name="caseManage" setup>
import Table from "@/components/Table/index.vue"
import { reactive, ref, toRefs } from "vue"
import { getCaseListApi, getCaseDataApi, saveCaseDataApi, getPlanDataOnlyCaseApi } from "@/api/case"
import { Case } from "@/api/case/types/case"
import { alert_error, alert_info } from "@/config/elMessage"
import Tools from "@/views/case-manage/components/tools.vue"
import CaseViews from "@/views/case-manage/components/views/caseViews.vue"
import CaseLine from "./components/design/caseLine.vue"
// import jsonViewer from "vue3-json-viewer"
import JsonEditorVue from "json-editor-vue3"
import { debugCaseApi } from "@/api/case/index"
import { Plan } from "@/api/case/types/case"
const props = defineProps({
  planId: {
    type: Number,
    default: null
  },
  onlyId: {
    type: Boolean,
    default: false
  }
})

const { planId } = toRefs(props)

const multipleSelection = ref<Case[]>([])
const handleSelectionChange = (val: Case[]) => {
  multipleSelection.value = val
}

const searchData = reactive({
  id: null,
  name: null,
  desc: null,
  planId: planId,
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

const dialog = reactive({
  visible: false,
  title: ""
})

const caseInfo = ref<Case>()

// const newCase = ref<Case>({
//   name: "",
//   desc: "",
//   update_user: "",
//   create_user: ""
// })

const getData = () => {
  if (dialog.title === "添加") return
  if (multipleSelection.value.length !== 1) {
    alert_error("请选择且只选择一条数据")
    return
  }
  getCaseDataApi({ id: multipleSelection.value[0].id })
    .then((res: ApiResponseData<Case>) => {
      caseInfo.value = res.data
      console.log(caseInfo)
    })
    .catch(() => {})
    .finally(() => {
      dialog.visible = true
    })
}

const case_view_data = ref<Plan>()

const debugCase = () => {
  const result = ref({ data: {} })
  getPlanDataOnlyCaseApi({ id: caseInfo.value?.id })
    .then((res) => {
      if (res) {
        case_view_data.value = res.data
        debugCaseApi({ data: case_view_data.value })
          .then((res) => {
            if (res) {
              result.value.data = res.data
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
    })
    .catch(() => {})
    .finally(() => {})
}

const saveInfo = () => {
  saveCaseDataApi({ planId: multipleSelection.value[0].id, data: caseInfo.value })
    .then((res: ApiResponseData<{}>) => {
      console.log(res)
    })
    .catch(() => {})
    .finally(() => {
      dialog.visible = false
    })
}

// const createInfo = () => {
//   createCaseDataApi({ planId: multipleSelection.value[0].id, data: caseInfo.value })
//     .then((res: ApiResponseData<{}>) => {
//       console.log(res)
//     })
//     .catch(() => {})
//     .finally(() => {
//       dialog.visible = false
//     })
// }
</script>

<style lang="scss" scoped></style>
