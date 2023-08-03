<script lang="ts" name="planManage" setup>
import { toRefs } from "vue"

const lookInfo = (dialog: any, getData: Function) => {
  dialog.title = "查看"
  getData()
}
const enditInfo = (dialog: any, getData: Function) => {
  dialog.title = "编辑"
  getData()
}
const viewsInfo = (dialog: any, getData: Function) => {
  dialog.title = "预览"
  getData()
}
const addInfo = (dialog: any, getData: Function) => {
  dialog.title = "添加"
  dialog.visible = true
  getData()
}

const props = defineProps({
  dialog: Object,
  getData: {
    type: Function,
    default: () => {}
  },
  getAddData: {
    type: Function,
    default: () => {}
  }
})

const { dialog, getData, getAddData } = toRefs(props)
</script>

<template>
  <div>
    <el-button type="primary" @click="lookInfo(dialog, getData)">查看</el-button>
    <el-button type="primary" @click="enditInfo(dialog, getData)">编辑</el-button>
    <el-button type="primary" @click="viewsInfo(dialog, getData)">预览</el-button>
    <el-button type="primary" @click="addInfo(dialog, getAddData)">添加</el-button>
  </div>
</template>

<style lang="scss" scoped>
.tools-but {
  margin-top: 0px;
  display: flex;
  justify-content: space-between;
}
</style>
