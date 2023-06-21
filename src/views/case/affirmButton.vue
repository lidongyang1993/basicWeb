<template>
  <el-button @click="clicked" type="primary">{{ label }}</el-button>
</template>

<script lang="ts">
import { ElMessageBox } from "element-plus"

export default {
  name: "ElButtonAffirm",
  props: {
    label: String,
    msg: String,
    affirm: Boolean,
    type: String,
    clickTodo: {
      type: Function,
      default() {
        console.log("no thing to do!")
      }
    }
  },
  methods: {
    clicked() {
      if (this.affirm === true) {
        ElMessageBox.confirm(this.msg, "Warning", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.clickTodo()
          })
          .catch(() => {})
      } else {
        this.clickTodo()
      }
    }
  }
}
</script>

<style scoped></style>
