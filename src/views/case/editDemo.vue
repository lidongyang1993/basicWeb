<script setup lang="ts" name="caseEdit">
// import { ContentWrap } from "@/components/ContentWrap"
import { onMounted, reactive } from "vue"
import JsonEditorVue from "json-editor-vue3"
import { ElMessage } from "element-plus"
import ElButtonAffirm from "./affirmButton.vue"
import { getCaseApi, checkCaseApi, addCaseApi, debugCaseApi, updateCaseApi } from "@/api/case"
import { useUserStore } from "@/store/modules/user"

const default_msg = {
  PLAN_NAME: "申报流程自动化-模板",
  MODULE_NAME: "module_001"
}

const userStore = useUserStore()

const jsonParams = reactive({
  data: {},
  module: default_msg.MODULE_NAME,
  planName: default_msg.PLAN_NAME
})

const msg = {
  get_aff: "请确认是否查询，该操作会覆盖已编辑的用例！",
  update_aff: "该操作会修改正式的用例，请确认您已经进行的DUB调试，并验证通过！",
  add_aff: "该操作会添加进正式的用例，请确认您已经进行的DUB调试，并验证通过！"
}

const PUBLIC = {
  TRUE: true,
  WARNING: "warning",
  DANGER: "danger",
  PRIMARY: "primary"
}

const result = reactive({
  data: {}
})

function alert_info(title: any) {
  ElMessage.info(title)
}

function alert_error(title: any) {
  ElMessage.error(title)
}

function alert_success(title: any) {
  ElMessage.success(title)
}

function alert_error_module() {
  if (jsonParams.module === null || jsonParams.module === "") {
    alert_error("请输入module")
    return false
  } else return true
}

function alert_error_user() {
  if (userStore.username === null || userStore.username === "") {
    alert_error("没有获取到用户信息，请重新登录")
    return false
  } else return true
}

function alert_error_data() {
  if (jsonParams.data === null) {
    alert_error("数据不能为空")
    return false
  } else return true
}

async function debugging() {
  const data = {
    data: jsonParams.data,
    user: userStore.username
  }

  if (!alert_error_data()) {
    return
  }
  if (!alert_error_user()) {
    return
  }
  const res = await debugCaseApi(data)
    .catch(() => {})
    .finally(() => {})
  if (res) {
    result.data = res.data
    if (res.code === 0) {
      if (res.data.result === false) {
        alert_info("cheack-失败")
      } else {
        alert_info("debug-完成")
      }
    } else {
      alert_error("debug-失败")
    }
  }
}

function alert_error_plan_name() {
  if (jsonParams.planName === null || jsonParams.planName === "") {
    alert_error("请输入planName")
    return false
  } else return true
}

async function getting() {
  const data = {
    name: jsonParams.planName,
    module: jsonParams.module
  }
  if (!alert_error_plan_name()) {
    return
  }
  if (!alert_error_module()) {
    return
  }
  const res = await getCaseApi(data)
    .catch(() => {})
    .finally(() => {})
  if (res) {
    jsonParams.data = res.data
    if (res.code === 0) {
      alert_success("get-成功")
    } else {
      alert_error("get-失败")
    }
  }
}

async function checking() {
  const data = {
    data: jsonParams.data,
    type: "plan"
  }
  const res = await checkCaseApi(data)
    .catch(() => {})
    .finally(() => {})
  if (res) {
    result.data = res.data
    if (res.code === 0) {
      if (res.data.result === false) {
        alert_error("check-失败")
      } else alert_success("check-通过")
    } else {
      alert_error("check-失败")
    }
  }
}

async function adding() {
  const data = {
    data: jsonParams.data,
    user: "public",
    module: jsonParams.module
  }
  if (!alert_error_plan_name()) {
    return
  }
  if (!alert_error_data()) {
    return
  }
  const res = await addCaseApi(data)
    .catch(() => {})
    .finally(() => {})
  if (res) {
    result.data = res.data
    if (res.code === 0) {
      if (res.data.result === false) {
        alert_error("check-失败")
      }
    } else {
      alert_error("add-失败")
    }
  }
}

async function update() {
  const data = {
    data: jsonParams.data,
    name: jsonParams.planName,
    module: jsonParams.module
  }
  if (!alert_error_plan_name()) {
    return
  }
  if (!alert_error_data()) {
    return
  }
  if (!alert_error_module()) {
    return
  }

  const res = await updateCaseApi(data)
    .catch(() => {})
    .finally(() => {})
  if (res) {
    result.data = res.data
    if (res.code === 0) {
      if (res.data.result === false) {
        alert_error("check-失败")
      } else alert_info("update-完成")
    } else {
      alert_error("update-失败")
    }
  }
}

onMounted(async () => {})

setTimeout(() => {}, 3000)
</script>

<template>
  <div class="body">
    <div>
      <el-row>
        <el-col :span="16">
          <el-card class="jsonCard">
            <JsonEditorVue v-model="jsonParams.data" class="jsonEdit" />
          </el-card>
        </el-col>
        <el-col :span="8">
          <ElCard class="jsonCard">
            <json-viewer :value="result.data" class="jsonViewer" />
          </ElCard>
        </el-col>
      </el-row>
    </div>
    <div class="input-list">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input class="input" v-model="jsonParams.module" placeholder="module" />
        </el-col>
        <el-col :span="6">
          <el-input class="input" v-model="jsonParams.planName" placeholder="name" />
        </el-col>
      </el-row>
    </div>
    <div class="button-list">
      <el-row :gutter="4">
        <el-button-affirm
          label="查-询"
          :click-todo="getting"
          :affirm="PUBLIC.TRUE"
          :msg="msg.get_aff"
          :type="PUBLIC.PRIMARY"
        />
        <el-button-affirm label="调-试" :click-todo="debugging" :type="PUBLIC.PRIMARY" />
        <el-button-affirm label="检-查" :click-todo="checking" :type="PUBLIC.PRIMARY" />
        <el-button-affirm
          label="添-加"
          :click-todo="adding"
          :affirm="PUBLIC.TRUE"
          :msg="msg.add_aff"
          :type="PUBLIC.DANGER"
        />
        <el-button-affirm
          label="更-新"
          :click-todo="update"
          :affirm="PUBLIC.TRUE"
          :msg="msg.update_aff"
          :type="PUBLIC.DANGER"
        />
      </el-row>
    </div>
  </div>
</template>

<style>
.body {
  margin: 10px;
}
.jsonCard {
  height: 600px;
  margin: 5px;
}

.jsonViewer {
  height: 100%;
}

.jsonEdit {
  height: 550px;
}
.button-list {
  margin-left: 10px;
}
.input-list {
  margin: 10px;
}
</style>
