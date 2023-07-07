<script lang="ts" name="caseManage" setup>
import Table from "@/components/Table/index.vue"
import { reactive, ref, toRefs, onUnmounted } from "vue"
import { getFileListApi } from "@/api/case"
import { Step } from "../../api/case/types/case"
import { alert_error } from "@/config/elMessage"

const props = defineProps({
  caseId: {
    type: Number,
    default: null
  },
  onlyId: {
    type: Boolean,
    default: false
  }
})

const dialog = reactive({
  visible: false,
  title: ""
})
const uploadToServer = () => {
  dialog.title = "预上传"
  dialog.visible = true
}

const { caseId } = toRefs(props)
onUnmounted(() => {
  // tableData.list = []
})
const multipleSelection = ref<Step[]>([])
const handleSelectionChange = (val: Step[]) => {
  multipleSelection.value = val
}

const searchData = reactive({
  id: null,
  name: null,
  desc: null,
  caseId: caseId,
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

import { genFileId } from "element-plus"
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus"
import { alert_success } from "../../config/elMessage"

const upload = ref<UploadInstance>()

const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const submitUpload = () => {
  upload.value!.submit()
}
const assertUplaod = (res: ApiResponseData<object>) => {
  if (res.code === 0) {
    alert_success(res.message)
    dialog.visible = false
  } else {
    alert_error(res.message)
  }
}
</script>

<template>
  <div>
    <Table
      :search-data="searchData"
      :get-table-data-api="getFileListApi"
      :current-page="searchData.currentPage"
      :size="searchData.size"
      :handle-current-change="handleCurrentChange"
      :handle-size-change="handleSizeChange"
      :selection-change="handleSelectionChange"
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
        <el-button type="primary" @click="uploadToServer">预上传</el-button>
      </template>
      <template #default>
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="id" label="编号" width="80" align="center" />
        <el-table-column prop="name" label="名称" align="center" />
        <el-table-column prop="desc" label="描述" align="left" />
        <el-table-column prop="path" label="云路径" align="left" />
      </template>
    </Table>
    <el-dialog v-model="dialog.visible" width="70%" v-if="dialog.visible">
      <el-card v-if="dialog.title === '预上传'">
        <el-upload
          ref="upload"
          class="upload-demo"
          action="/api/v2/fileManage/upload"
          :limit="1"
          :on-exceed="handleExceed"
          :on-success="assertUplaod"
          :auto-upload="false"
        >
          <template #trigger>
            <el-button type="primary">选择文件</el-button>
          </template>
          <el-button class="ml-3" type="success" @click="submitUpload"> 上传文件 </el-button>
          <template #tip>
            <div class="el-upload__tip text-red">一次只能上传一个文件，重复选择将会覆盖！</div>
          </template>
        </el-upload>
      </el-card>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
