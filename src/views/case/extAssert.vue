<template>
  <div class="body">
    <div>
      <el-row>
        <el-col :span="10">
          <el-card class="jsonCard">
            <json-editor-vue v-model="jsonParams.data" class="json-editor" />
          </el-card>
        </el-col>
        <el-col :span="10">
          <ElCard class="jsonCard">
            <json-editor-vue v-model="result.data" class="json-editor" />
          </ElCard>
        </el-col>
      </el-row>
    </div>
    <div class="input-list">
      <el-row :gutter="20">
        <span class="input-span">保留字段</span
        ><el-col :span="6"><el-input class="input" v-model="jsonParams.fields" /></el-col>
        <span class="input-span">排除字段</span
        ><el-col :span="6"><el-input class="input" v-model="jsonParams.e_fields" /></el-col>
      </el-row>
    </div>
    <div class="button-list">
      <el-button-affirm label="检查" :click-todo="ext_assert" :affirm="false" :type="PUBLIC.PRIMARY" />
    </div>
  </div>
</template>

<script setup lang="ts" name="extAssert">
import JsonEditorVue from "json-editor-vue3"
import { reactive } from "vue"
import ElButtonAffirm from "./affirmButton.vue"
import { checkExrAssertsApi } from "@/api/case"
import { alert_error, alert_success, alert_info } from "@/config/elMessage"

const jsonParams = reactive({
  data: null,
  fields: null,
  e_fields: null,
  response: null
})

const PUBLIC = {
  TRUE: true,
  WARNING: "warning",
  DANGER: "danger",
  PRIMARY: "primary"
}

const result = reactive({
  data: {}
})

function alert_error_data() {
  if (jsonParams.data === null || jsonParams.data === "") {
    alert_error("数据不能为空")
    return false
  } else return true
}

async function ext_assert() {
  const data = {
    data: jsonParams.data,
    fields: jsonParams.fields,
    e_fields: jsonParams.e_fields
  }

  if (!alert_error_data()) {
    return
  }

  const res = await checkExrAssertsApi(data)
    .catch(() => {})
    .finally(() => {})
  if (res) {
    result.data = res.data
    if (res.code === 0) {
      alert_success("check-成功")
    } else {
      alert_info("check-失败")
    }
  }
}
</script>
<style>
.jsonCard {
  height: 600px;
}
.button-list {
  top: 20px;
}
.input-list {
  top: 5px;
  left: 10px;
}
.left-view {
  width: 400px;
}
.json-editor {
  height: 540px;
}
</style>
