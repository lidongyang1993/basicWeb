<template>
  <div>
    <div class="common-layout">
      <section h-full bg-white flex>
        <el-container>
          <!-- <el-aside /> -->
          <el-container>
            <el-main border="0 x solid gray-200" class="main">
              <el-header border="0 b solid gray-200" flex gap-2 items-center justify-end h-20 py-0 px-2>
                <slot />
                <el-button type="primary" @click="handleClearable"> 清空 </el-button>
                <el-button type="primary" @click="previewVisible"> 预览 </el-button>
              </el-header>
              <el-scrollbar max-height="1800px">
                <caseEditMain :info="planInfo" />
              </el-scrollbar>
            </el-main>
          </el-container>
        </el-container>
      </section>
    </div>
  </div>
</template>
<script lang="ts" name="caseManage" setup>
import { getWidgetForm } from "@/config/design"
import { ref, onMounted } from "vue"
import { Plan } from "@/api/case/types/case"
import { alert_error } from "@/config/elMessage"

import caseEditMain from "./components/design/caseEditMain.vue"

const planInfo = ref<Plan>({
  name: "",
  desc: "",
  label_id_list: [],
  module_id: undefined,
  variable: {},
  case: [],
  create_user: "",
  update_user: ""
})

const widgetFrom = ref(getWidgetForm())

const handleClearable = () => {
  widgetFrom.value.list = []
}

const preview = ref(false)

const previewVisible = () => {
  preview.value = true
  alert_error(preview.value)
}

onMounted(() => {})
</script>
<style lang="scss">
.aside {
  background-color: rgb(216, 216, 183);
  height: 1080px;
}
.main {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 1080px;
}
.plan-info {
  width: 100%;
}
</style>
